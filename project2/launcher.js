class Launcher
{
    constructor(id_,x_init,y_init,h_init,type_,px_,py_)
    {
        this.id = id_;
        this.h = h_init;
        this.sprite = createSprite(x_init, y_init, 90, 90);
        this.sprite.visible = false;
        this.color = color(224,102,102);
        this.outline = color(getOutline(224,102,102));
        this.sprite.rotation = h_init;
        this.type = type_;
        //console.log(type_);
        this.aiming = false; //Does it Aim?
        this.moving = false; //Does it Move?
        this.healing = false; //Does it drop health pickup on death?
        this.boost = false; //Are the missles boosted?
        this.multi = false //Can it shoot missiles?
        this.mtype = 0; //Missle Type
        this.fireAnim = 0;
        this.multiTimer = 0;
        this.px = px_; //List of moving launcher checkpoints x
        this.py = py_; //List of moving launcher checkpoints y
        this.pTracker = 0; //Tracks where moving launchers are
        this.curr = 0;
        this.target = 1;
        switch(this.type)
        {
            case 0: //Basic
                break;
            case 1: //Aiming
                this.aiming = true;
                break;
            case 2: //Boosted Shot
                this.boost = true;
                break;
            case 3: //Spurt Shot
                this.aiming = true;
                this.mtype = 1;
                this.color = color(166,206,57);
                this.outline = color(getOutline(166,206,57));
                break;
            case 4: //Multi Missiles
                this.aiming = true;
                this.multi = true;
                this.mtype = 2;
                this.color = color(142,124,195);
                this.outline = color(getOutline(142,124,195));
                break;
            case 5: //Moving
                this.moving = true;
                this.color = color(245,162,79);
                this.outline = color(getOutline(245,162,79));
                break;
            case 6: //Moving Aiming
                this.aiming = true;
                this.moving = true;
                this.color = color(245,162,79);
                this.outline = color(getOutline(245,162,79));
                break;
        }
    }
    
    render()
    {
        if (this.moving == true)
        {
            for(let i=1;i<this.px.length;i++)
            {
                strokeWeight(15);
                stroke(245,162,79);
                line(this.px[i-1],this.py[i-1],this.px[i],this.py[i]);
            }
            strokeWeight(15);
            line(this.px[0],this.py[0],this.px[this.px.length-1],this.py[this.py.length-1]);
            strokeWeight(5);
        }
        if (this.sprite.removed == false)
        {
            p.collide(this.sprite);
            push();
            rectMode(CENTER);
            translate(this.sprite.position.x,this.sprite.position.y)
            rotate(this.sprite.rotation);
            //rotate(this.h);
            strokeWeight(5);
            fill(this.color);
            stroke(this.outline);
            if (typeof m[this.id] == "object" && stopped == false)
            {
                if (m[this.id].launched == false)
                {
                    this.fireAnim -= 1;
                }
                else
                {
                    this.fireAnim = 0;
                }
            }
            this.fireAnim2 = sin(this.fireAnim*14)*10;
            //console.log(this.fireAnim);
            if (this.boost == true)
            {
                triangle(35+this.fireAnim2,0,60+this.fireAnim2,25,60+this.fireAnim2,-25);
            }
            triangle(20+this.fireAnim2,0,45+this.fireAnim2,25,45+this.fireAnim2,-25);
            rect(0,0, 60,60);
            angleMode(DEGREES);
            if (this.aiming == true)
            {
                ellipse(0,0,30,30);
                this.sprite.rotation = degrees(Math.atan2(p.position.y - this.sprite.position.y, p.position.x - this.sprite.position.x));
                //console.log(degrees(Math.atan2(p.position.y - this.sprite.position.y, p.position.x - this.sprite.position.x)));
            }
            pop();
            if (this.multi == true && stopped == false)
            {
                this.multiTimer-=1;
                //console.log(this.multiTimer);
                noStroke();
                fill(0);
                //strokeWeight(0);
                textAlign(CENTER,CENTER);
                textSize(20);
                text(round(map(this.multiTimer,0,180,0.5,3.5)),this.sprite.position.x,this.sprite.position.y);
                if (this.multiTimer < 0)
                {
                    m.push(new Missile(this.id));
                    //console.log(typeof [this.id]);
                    //console.log(m[this.id].length);
                    this.multiTimer = 300;
                }
            }
            
        }
        
    }

    move()
    {
        console.log(this.curr);
        console.log(this.target);
        if (dist(this.sprite.position.x,this.sprite.position.y,this.px[this.target],this.py[this.target]) < 2)
        {
            this.curr+=1;
            this.target+=1;
            if (this.curr > this.px.length-1)
            {
                this.curr = 0;
            }
            if (this.target > this.px.length-1)
            {
                this.target = 0;
            }
        }
        this.p1 = createVector(this.px[this.curr],this.py[this.curr]);
        this.p2 = createVector(this.px[this.target],this.py[this.target]);
        this.moveDir = p5.Vector.sub(this.p1, this.p2);
        this.moveDir.setMag(-2);
        this.sprite.position.add(this.moveDir);
    }

}