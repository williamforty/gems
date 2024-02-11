' open window 640,512
' setrgb 0,0,0,0

initialise()
generate_board()

while (1=1)
    player_control()
    check_for_completion()
    draw()
    display_window()
wend

sub display_window()
    setdrawbuf draw
    draw=1-draw
    setdispbuf draw
    clear window
end sub

sub check_for_completion()

    for n=1 to grid_size^2
        if (z(n) = 1) then return fi
    next

    repeat
        draw()
        setrgb 1,255,255,255
        text 150,250, "Either the level was easy, or you're a"
        text 270,280, "A LEGEND!!!"
        text 330,320, "Press SELECT for a new game", "cc"
        display_window()
    until (and(peek("port1"), 1)=1)

    generate_board_number()
    generate_board()

end sub

' Set initial values
sub initialise()

    dim x(1000),y(1000),z(1000)

    d=4

    grid_size=9
    input_repeat_delay=8
    square_size=320/(grid_size+1)

    ' 9x9 - 981018458
    ' 9x9 - 377786364

    ' Game number
    number=510256994

end sub

' Randomly generates board
sub generate_board_number()
    number=int(ran(899999999))+100000000
end sub

sub generate_board()

    for n=1 to grid_size*grid_size
        x(n) = -(mod(n-1,grid_size)+1)+grid_size+1
        y(n) = int((grid_size-1+n)/grid_size)

        z(n) = int(mod(number/n,15))
        if (z(n) >= 12) then z(n)=1
        elsif z(n)>5 or z(n)=0 then
            z(n)=10
        fi
    next

    cursor_x=1
    cursor_y=1

end sub

' Player control
sub player_control()

    c = peek("PORT1")

    if (and(c, 16384) <> 16384) then

        if (and(c,16) = 16) then
            if k=input_repeat_delay or k=0 then cursor_y=cursor_y-1 fi
            if k>0 then k=k-1 fi
        elsif and(c,64) = 64 then
            if k=input_repeat_delay or k=0 then cursor_y=cursor_y+1 fi
            if k>0 then k=k-1 fi
        elsif and(c,128) = 128 then
            if k=input_repeat_delay or k=0 then cursor_x=cursor_x-1 fi
            if k>0 then k=k-1 fi
        elsif and(c,32) = 32 then
            if k=input_repeat_delay or k=0 then cursor_x=cursor_x+1 fi
            if k>0 then k=k-1 fi
        else
            k=input_repeat_delay
        fi

        if cursor_y>grid_size then cursor_y=grid_size : k=20 fi
        if cursor_y<1 then cursor_y=1 : k=20 fi
        if cursor_x>grid_size then cursor_x=grid_size : k=20 fi
        if cursor_x<1 then cursor_x=1 : k=20 fi
        target_cursor_y=0
        target_cursor_x=0

    else

        select_gem()

    fi

    if and(c,8) = 8 then
        generate_board()
    fi

    if and(c,1) = 1 then
        generate_board_number()
        generate_board()
    fi

end sub

' Calculating target location

sub select_gem()

    current_item=cursor_y*grid_size-cursor_x+1
    gem_distance=z(current_item)-1

    if z(current_item)>=2 and z(current_item)<=5 then
        if (and(c,16)=16 and cursor_y-gem_distance>=1) then
            target_cursor_y=cursor_y-gem_distance
            target_cursor_x=cursor_x
            gem_reactions()
        elsif and(c,64)=64 and cursor_y+gem_distance<=grid_size then
            target_cursor_y=cursor_y+gem_distance
            target_cursor_x=cursor_x
            gem_reactions()
        elsif and(c,128)=128 and cursor_x-gem_distance>=1 then
            target_cursor_y=cursor_y
            target_cursor_x=cursor_x-gem_distance
            gem_reactions()
        elsif and(c,32)=32 and cursor_x+gem_distance<=grid_size then
            target_cursor_y=cursor_y
            target_cursor_x=cursor_x+gem_distance
            gem_reactions()
        else
            target_cursor_y=cursor_y
            target_cursor_x=cursor_x
        fi
    else
        target_cursor_y=cursor_y
        target_cursor_x=cursor_x
    fi

end sub

' Setting rules for movements

sub gem_reactions()

    if and(c,2048)=2048 and swt=0 then
        current_item=cursor_y*grid_size-cursor_x+1
        target_item=target_cursor_y*grid_size-target_cursor_x+1
        swt=1

        ' rule 1: if any gem lands on a black gem, the black gem is destroyed
        if z(target_item)=1 then
            z(target_item)=z(current_item) : z(current_item)=0
            cursor_x=target_cursor_x
            cursor_y=target_cursor_y

        ' rule 2: moving a gem into an empty space moves the gem up one in sequence (except yellow)
        elsif z(target_item)=0 then
            if z(current_item)+1<=5 then
                z(target_item)=z(current_item)+1
            else z(target_item)=z(current_item) fi
            z(current_item)=0
            cursor_x=target_cursor_x
            cursor_y=target_cursor_y

        ' rule 3: alike gems combine into the gem one down in sequence
        elsif z(target_item)=z(current_item) then
            z(target_item)=z(current_item)-1 : z(current_item)=0
            cursor_x=target_cursor_x
            cursor_y=target_cursor_y

        ' rule 4: gems destroy a block and turn black
        elsif z(target_item)=10 then
            z(target_item)=1 : z(current_item)=0
            cursor_x=target_cursor_x
            cursor_y=target_cursor_y
        fi

        wait 1
    elsif and(x,2048) <> 2048
        swt=0
    fi

end sub

' Draw

sub draw()

    ' Drawing the background

    setrgb 1,50,0,0:setrgb 2,0,0,50:setrgb 3,0,50,50
    gtriangle 0,0 to 0,512 to 640,512
    setrgb 1,50,0,0:setrgb 2,50,50,0:setrgb 3,0,50,50
    gtriangle 0,0 to 640,0 to 640,512

    setrgb 1,250,250,250
    text 320,40, str$(number,"#########"), "cc"

    ' Drawing the board

    setrgb 1,50,40,0
    fill triangle 320-grid_size*square_size,256 to 320-grid_size*square_size,256+10 to 320,256+grid_size*square_size/2
    fill triangle 320,256+10+grid_size*square_size/2 to 320-grid_size*square_size,256+10 to 320,256+grid_size*square_size/2

    setrgb 1,70,50,0
    fill triangle 320+grid_size*square_size,256 to 320+grid_size*square_size,256+10 to 320,256+grid_size*square_size/2
    fill triangle 320,256+10+grid_size*square_size/2 to 320+grid_size*square_size,256+10 to 320,256+grid_size*square_size/2

    for n=1 to grid_size*grid_size
        x=x(n)*square_size+y(n)*square_size
        y=y(n)*square_size/2-x(n)*square_size/2

        if mod(x(n)+y(n),2) = 0 then
            setrgb 1,0,0,100
        else
            setrgb 1,100,100,100
        fi

        fill triangle x-square_size, 256+y to x+square_size,256+y to x,256+y-square_size/2
        fill triangle x-square_size, 256+y to x+square_size,256+y to x,256+y+square_size/2

    next

    ' Drawing the items
    for n=1 to grid_size*grid_size

        if (and(c,16384)=16384 and n=target_cursor_y*grid_size-target_cursor_x+1) then
            drawing_target_cursors_back()
            i=1.3
        elsif n=cursor_y*grid_size-cursor_x+1 then
            drawing_cursors_back()
            i=1.3
        else i=1 fi

        x=x(n)*square_size+y(n)*square_size
        y=y(n)*square_size/2-x(n)*square_size/2

        if z(n)=10 then
            setrgb 1,80*i,80*i,80*i
            fill triangle x-square_size,256+y-square_size*0.5 to x+square_size,256+y-square_size*0.5 to x,256+y-square_size
            fill triangle x-square_size,256+y-square_size*0.5 to x+square_size,256+y-square_size*0.5 to x,256+y
            setrgb 1,50*i,50*i,50*i
            fill triangle x-square_size,256+y-square_size*0.5 to x-square_size,256+y to x,256+y
            fill triangle x,256+y+square_size*0.5 to x-square_size,256+y to x,256+y
            setrgb 1,60*i,60*i,60*i
            fill triangle x+square_size,256+y-square_size*0.5 to x+square_size,256+y to x,256+y
            fill triangle x,256+y+square_size*0.5 to x+square_size,256+y to x,256+y
        elsif z(n) <> 0 then

            if z(n)=1 then
                r=5:g=5:b=5:ri=2.2:gi=2.2:bi=2.2
            elsif z(n)=2 then
                r=20:g=4:b=4:ri=1:gi=2.2:bi=2.2
            elsif z(n)=3 then
                r=5:g=20:b=4:ri=2.2:gi=1:bi=2.2
            elsif z(n)=4 then
                r=4:g=4:b=20:ri=2.2:gi=2.2:bi=1
            elsif z(n)=5 then
                r=20:g=20:b=4:ri=1:gi=1:bi=2.2
            fi

            setrgb 1, r*7*i,g*7*i,b*7*i
            fill triangle x-square_size*0.4,256+y-square_size*0.8 to x+square_size*0.4,256+y-square_size*0.8 to x,256+y-square_size*1
            fill triangle x-square_size*0.4,256+y-square_size*0.8 to x+square_size*0.4,256+y-square_size*0.8 to x,256+y-square_size*0.6

            setrgb 1,r*6*i,g*6*i,b*6*i
            fill triangle x,256+y to x+square_size*0.6,256+y-square_size*0.6 to x,256+y-square_size*0.3
            setrgb 1,r*4*i,g*4*i,b*4*i
            fill triangle x-square_size*0.6,256+y-square_size*0.6 to x,256+y to x,256+y-square_size*0.3

            setrgb 1,r*ri*8*i,g*gi*8*i,b*bi*8*i
            fill triangle x,256+y-square_size*0.3 to x+square_size*0.4,256+y-square_size*0.8 to x,256+y-square_size*0.6
            fill triangle x,256+y-square_size*0.3 to x+square_size*0.4,256+y-square_size*0.8 to x+square_size*0.6,256+y-square_size*0.6

            setrgb 1,r*6*i,g*6*i,b*6*i
            fill triangle x,256+y-square_size*0.3 to x-square_size*0.4,256+y-square_size*0.8 to x,256+y-square_size*0.6
            fill triangle x,256+y-square_size*0.3 to x-square_size*0.4,256+y-square_size*0.8 to x-square_size*0.6,256+y-square_size*0.6
        fi

        if and(c, 16384)=16384 and n=target_cursor_y*grid_size-target_cursor_x+1 then
            drawing_target_cursors_front()
        fi

        if n=cursor_y*grid_size-cursor_x+1 then
            drawing_cursors_front()
        fi

    next

end sub

' Drawing cursor

sub drawing_cursors_back()

    ' Drawing back of the cursor

    x=cursor_x*square_size+cursor_y*square_size
    y=256+cursor_y*square_size/2-cursor_x*square_size/2

    if mod(cursor_x+cursor_y,2) = 0 then
        setrgb 1,0,0,160
    else
        setrgb 1,160,160,160
    fi
    
    fill triangle x-square_size,y to x,y-0.5*square_size to x+square_size,y
    fill triangle x-square_size,y to x,y+0.5*square_size to x+square_size,y

    setrgb 1,255,255,255
    line x-square_size,y to x,y-0.5*square_size
    line x+square_size,y to x,y-0.5*square_size
    line x,y-square_size*0.5 to x,y-square_size*1.9
    line x+square_size,y to x,y-0.5*square_size
    line x,y-square_size*0.5 to x,y-square_size*1.9

end sub

sub drawing_cursors_front()

    x=cursor_x*square_size+cursor_y*square_size
    y=256+cursor_y*square_size/2-cursor_x*square_size/2

    setrgb 1,255,255,255
    line x,y+square_size*0.5 to x,y-square_size*0.9
    line x+square_size,y to x+square_size,y-square_size*1.4
    line x-square_size,y to x-square_size,y-square_size*1.4

    line x-square_size,y-square_size*1.4 to x,y-1.9*square_size
    line x+square_size,y to x+square_size,y-square_size*1.4
    line x-square_size,y to x-square_size,y-square_size*1.4

    line x-square_size,y-square_size*1.4 to x,y-1.9*square_size
    line x-square_size,y-square_size*1.4 to x,y-0.9*square_size
    line x-square_size,y to x,y+square_size*0.5
    line x+square_size,y-square_size*1.4 to x,y-1.9*square_size
    line x+square_size,y-square_size*1.4 to x,y-0.9*square_size
    line x+square_size,y to x,y+square_size*0.5

end sub

sub drawing_target_cursors_back()

    x = target_cursor_x*square_size+target_cursor_y*square_size
    y = 256+target_cursor_y*square_size/2-target_cursor_x*square_size/2

    if (mod(target_cursor_x+target_cursor_y,2)=0) then
        setrgb 1,0,0,160
    else
        setrgb 1,160,160,160
    fi

    fill triangle x-square_size,y to x,y-0.5*square_size to x+square_size,y
    fill triangle x-square_size,y to x,y+0.5*square_size to x+square_size,y

    setrgb 1,255,255,255
    line x-square_size,y to x,y-0.5*square_size
    line x+square_size,y to x,y-0.5*square_size
    line x,y-square_size*0.5 to x,y-square_size*1.9

end sub

sub drawing_target_cursors_front()

    x=target_cursor_x*square_size+target_cursor_y*square_size
    y=256+target_cursor_y*square_size/2-target_cursor_x*square_size/2

    setrgb 1,155,155,155
    line x,y+square_size*0.5 to x,y-square_size*0.9
    line x+square_size,y to x+square_size,y-square_size*1.4
    line x-square_size,y to x-square_size,y-square_size*1.4

    line x-square_size,y-square_size*1.4 to x,y-1.9*square_size
    line x-square_size,y-square_size*1.4 to x,y-0.9*square_size
    line x-square_size,y to x,y+square_size*0.5
    line x+square_size,y-square_size*1.4 to x,y-1.9*square_size
    line x+square_size,y-square_size*1.4 to x,y-0.9*square_size
    line x+square_size,y to x,y+square_size*0.5

end sub