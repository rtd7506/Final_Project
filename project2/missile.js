class Missile
{
    constructor(id_)
    {
        this.id = id_;
        this.sprite = createSprite(0,0, 25, 25);
        this.sprite.topSpeed = -1;
        this.sprite.friction = .01;
        this.source = 0;
        for(let i=0;i<l.length;i++)
        {
            if (l[i].id == this.id)
            {
                this.source = i;
            }
        }
        this.sprite.position.x = l[this.source].sprite.position.x;
        this.sprite.position.y = l[this.source].sprite.position.y;
        this.boost = l[this.source].boost;
        if (this.boost == true)
        {
            this.sprite.setSpeed(6,l[this.source].sprite.rotation);
        }
        else
        {
            this.sprite.setSpeed(2,l[this.source].sprite.rotation);
        }
        this.launched = false;
        this.sprite.visible = false;
        this.color = color(235,203,36);//l[this.id].color;
        this.outline = color(getOutline(235,203,36));//l[this.id].outline;
        this.spurt = l[this.source].mtype == 1;
        this.multi = l[this.source].mtype == 2;
        this.sMove = false;
        this.sTimer = 0;
        this.storedAccel = p5.Vector.sub(p.position, this.sprite.position);
        //this.sprite.acceleration.setMag(.05);

        //console.log(this.spurt);
        
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
                //console.log(this.sprite.life);
            }
            else
            {
                rotate(this.sprite.velocity.heading());
            }
            */
            rotate(this.sprite.velocity.heading());
            if (this.spurt == true)
            {
                triangle(5, 0, -15, 10, -15, -10);
                triangle(15, 0, -5, 10, -5, -10);
            }
            else if (this.multi == true)
            {
                triangle(5, 0, -10, 10, -10, -10);
            }
            else
            {
                triangle(15, 0, -15, 15, -15, -15);
            }
            
            pop()
        } 
    }
    move()
    {
        if (this.spurt == true)
        {
            this.sTimer += 1;
            if (this.sTimer > 20)
            {
                this.sMove = true; 
                if (this.sTimer > 80)
                {
                    this.sTimer = 0;
                }
            }
            else if (this.sTimer < 40)
            {
                this.sMove = false;
            }
        }

        this.sprite.acceleration = p5.Vector.sub(p.position, this.sprite.position);
        this.sprite.acceleration.setMag(.05);
        
        if (this.spurt == true)
        {
            if (this.sMove == true)
            {
                this.sprite.velocity.add(this.sprite.acceleration);
                this.sprite.velocity.limit(this.sprite.topspeed);
                this.sprite.position.add(this.sprite.velocity);
            }
        }
        else
        {
            this.sprite.velocity.add(this.sprite.acceleration);
            this.sprite.velocity.limit(this.sprite.topspeed);
            this.sprite.position.add(this.sprite.velocity);
        }
        this.sprite.rotate = this.sprite.rotation;

        /* Tested new movement script
        angleMode(DEGREES);
        //let a = this.sprite.position.angleBetween(p.position);
        this.a = atan2((p.position.y-this.sprite.position.y)/2,(p.position.x-this.sprite.position.x)/2);
        //console.log(this.a + " : " + this.sprite.getDirection());
        if (this.sprite.getDirection() < this.a+1 || this.sprite.getDirection() > this.a-1)
        {
            //console.log("TEST");
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
                    //console.log(l[i]);
                    if (this.sprite.overlap(l[i].sprite)) 
                    {
                        //console.log("COLLISION");

                        this.sprite.remove();
                        l[i].sprite.remove();
                        l.splice(i, 1);
                        console.log("DIEEEEEE");
                        //s_explode.play();
                        
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
                if (typeof m[i] == "object" && m[i].launched == true) 
                {
                    
                    if (this.sprite.overlap(m[i].sprite) && this.sprite != m[i].sprite) 
                    {
                        //console.log("COLLISION");

                        this.sprite.remove();
                        m[i].sprite.remove();
                        m.splice(i, 1);
                        //s_explode.play();
                        
                    }
                }
            }
        }

        //p Collision
        if (this.sprite.overlap(p))
        {
            this.sprite.remove();
            //console.log("p Dead")
            if (this.multi == true)
            {
                health -= 0.5;
            }
            else
            {
                health -= 1;
            }
            s_hurt.play();
        }
        
        //General Detection
        if (this.sprite.removed)
        {
            let clear = false;
            for(let j=0;j<m.length;j++)
            {
                if (m[j].sprite.position.x == this.sprite.position.x)
                {
                    clear = j;
                }
            }
            m.splice(clear, 1);
            s_explode.play();
            //console.log(m);
            //console.log(l);
        }

    }
    update()
    {
        this.source = 0;
        for(let i=0;i<l.length;i++)
        {
            if (l[i].id == this.id)
            {
                this.source = i;
            }
        }
        if (this.launched == false && typeof l[this.source] == "object")
        {
            if (this.sprite.overlap(l[this.source].sprite) == false)
            {
                this.launched = true;
            }
            //console.log("LAUNCH");
        }
        if (typeof l[this.source] != "object")
        {
            this.launched = true;
        }
        if (this.launched == true)
        {
            this.collision();
        }
        
    }
}