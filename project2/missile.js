class Missile
{
    constructor(id_)
    {
        this.id = id_;
        this.sprite = createSprite(0,0, 25, 25);
        this.sprite.topSpeed = -1;
        this.sprite.friction = .01;
        this.sprite.position.x = l[this.id].sprite.position.x;
        this.sprite.position.y = l[this.id].sprite.position.y;
        this.sprite.setSpeed(2,l[this.id].sprite.rotation);
        this.launched = false;
        //this.sprite.visible = false;
        this.color = l[this.id].color;
        this.outline = l[this.id].outline;
        
        this.a = 0;
        //this.sprite.life = random(500,750); //Life System
    }
    render()
    {
        if (this.sprite.removed == false)
        {
            fill(this.color);
            stroke(this.outline);
            push()
            translate(this.sprite.position.x, this.sprite.position.y);
            /* Life System Shake
            if (this.sprite.life < 100)
            {
                rotate(this.sprite.velocity.heading() + sin(this.sprite.life)/(this.sprite.life/10));
                console.log(this.sprite.life);
            }
            else
            {
                rotate(this.sprite.velocity.heading());
            }
            */
            rotate(this.sprite.velocity.heading());

            triangle(20, 0, -20, 20, -20, -20);
            pop()
        } 
        else
        {

        }
    }
    move()
    {
        this.sprite.acceleration = p5.Vector.sub(p.position, this.sprite.position);
        this.sprite.acceleration.setMag(.05);
        this.sprite.velocity.add(this.sprite.acceleration);
        this.sprite.velocity.limit(this.sprite.topspeed);
        this.sprite.position.add(this.sprite.velocity);
        this.sprite.rotate = this.sprite.rotation;

        /* Tested new movement script
        angleMode(DEGREES);
        //let a = this.sprite.position.angleBetween(p.position);
        this.a = atan2((p.position.y-this.sprite.position.y)/2,(p.position.x-this.sprite.position.x)/2);
        console.log(this.a + " : " + this.sprite.getDirection());
        if (this.sprite.getDirection() < this.a+1 || this.sprite.getDirection() > this.a-1)
        {
            console.log("TEST");
        }
        */
    }
    collision()
    {
        //Launcher Collision
        if (l.length > 0)
        {
            for (let i = 0; i < l.length; i++) 
            {
                if (typeof l[i] == "object") 
                {
                    
                    if (this.sprite.overlap(l[i].sprite)) 
                    {
                        console.log("COLLISION");

                        this.sprite.remove();
                        l[i].sprite.remove();
                        l.splice(i, 1, "None");
                        
                    }
                    /* Life System Test
                    if (this.sprite.life < 0)
                    {
                        this.sprite.remove();
                    }
                    */

                    
                }
            }
        }
        
        //Other Missle Collision
        if (m.length > 0)
        {
            for (let i = 0; i < m.length; i++) 
            {
                if (typeof m[i] == "object") 
                {
                    
                    if (this.sprite.overlap(m[i].sprite)) 
                    {
                        console.log("COLLISION");

                        this.sprite.remove();
                        m[i].sprite.remove();
                        m.splice(i, 1, "None");
                        
                    }
                }
            }
        }

        //Player Collision
        if (this.sprite.overlap(p))
        {
            this.sprite.remove();
            console.log("Player Dead")
        }
        
        //General Detection
        if (this.sprite.removed)
        {
            m.splice(this.id, 1, "None");
                        
            console.log(m);
            console.log(l);
        }

    }
    update()
    {
        if (this.launched == false && this.sprite.overlap(l[this.id].sprite) == false)
        {
            this.launched = true;
            console.log("LAUNCH");
        }
        if (this.launched == true)
        {
            this.collision();
        }
    }
}