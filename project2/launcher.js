class Launcher
{
    constructor(id_,x_init,y_init,h_init,type_)
    {
        this.id = id_;
        this.h = h_init;
        this.sprite = createSprite(x_init, y_init, 90, 90);
        //this.sprite.setCollider("circle",0,0,90);
        this.sprite.visible = false;
        this.color = color(224,102,102);
        this.outline = color(getOutline(224,102,102));
        this.sprite.rotation = h_init;
        this.type = type_;
        //console.log(type_);
        this.aiming = false; //Does it Aim?
        this.moving = false; //Does it Move?
        this.healing = false; //Does it drop health pickup on death?
        this.boost = false; //Are the missles boosted
        this.mtype = 0; //Missle Type
        this.fireAnim = 0;
        this.multi = false;
        this.multiTimer = 0;
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
                this.mtype = 2;
                this.multi = true;
                this.color = color(142,124,195);
                this.outline = color(getOutline(142,124,195));
                break;
            case 5: //Moving
                this.aiming = true;
                this.moving = true;
                break;
            case 6: //Moving Spurt
                this.aiming = true;
                this.mtype = 1;
                this.moving = true;
                break;
            case 7: //Exploding Missles
                this.aiming = true;
                this.mtype = 2;
                break;
            case 8:
                this.aiming = true;
                this.healing = true;
        }

        if (this.multi == true)
        {
            m[this.id] = [0,0,0,0];
        }
    }
    
    render()
    {
        if (this.sprite.removed == false)
        {
            p.collide(this.sprite);
            push();
            rectMode(CENTER);
            translate(this.sprite.position.x,this.sprite.position.y)
            rotate(this.sprite.rotation);
            //rotate(this.h);
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
                    m[this.id][m[this.id].length] = new Missile(this.id,m[this.id].length);
                    //console.log(typeof [this.id]);
                    //console.log(m[this.id].length);
                    this.multiTimer = 300;
                }
            }
            
            
        }

    }

}