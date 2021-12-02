class Launcher
{
    constructor(id_,x_init,y_init,h_init,type_)
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
        this.mtype = 0; //Missle Type
        switch(this.type)
        {
            case 0: //Basic
                break;
            case 1: //Aiming
                this.aiming = true;
                break;
            case 2: //Spurt Shot
                this.aiming = true;
                this.mtype = 1;
                this.color = color(166,206,57);
                this.outline = color(getOutline(166,206,57));
                break;
            case 3: //Moving
                this.aiming = true;
                this.moving = true;
                break;
            case 4: //Moving Spurt
                this.aiming = true;
                this.mtype = 1;
                this.moving = true;
                break;
            case 5: //Exploding Missles
                this.aiming = true;
                this.mtype = 2;
                break;
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
            triangle(20,0,45,25,45,-25);
            rect(0,0, 60,60);
            angleMode(DEGREES);
            if (this.aiming == true)
            {
                ellipse(0,0,30,30);
                this.sprite.rotation = degrees(Math.atan2(p.position.y - this.sprite.position.y, p.position.x - this.sprite.position.x));
                //console.log(degrees(Math.atan2(p.position.y - this.sprite.position.y, p.position.x - this.sprite.position.x)));
            }
            pop();
            
        }

    }

}