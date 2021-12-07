class Missile
{
    constructor(id_,id2_)
    {
        this.id = id_;
        this.sprite = createSprite(0,0, 25, 25);
        this.sprite.topSpeed = -1;
        this.sprite.friction = .01;
        this.sprite.position.x = l[this.id].sprite.position.x;
        this.sprite.position.y = l[this.id].sprite.position.y;
        this.boost = l[this.id].boost;
        if (this.boost == true)
        {
            this.sprite.setSpeed(6,l[this.id].sprite.rotation);
        }
        else
        {
            this.sprite.setSpeed(2,l[this.id].sprite.rotation);
        }
        this.launched = false;
        this.sprite.visible = false;
        this.color = color(235,203,36);//l[this.id].color;
        this.outline = color(getOutline(235,203,36));//l[this.id].outline;
        this.spurt = l[this.id].mtype == 1;
        this.multi = l[this.id].mtype == 2;
        this.sMove = false;
        this.sTimer = 0;
        this.id2 = id2_;
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
                console.log(this.sprite.life);
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
            else
            {
                triangle(15, 0, -15, 15, -15, -15);
            }
            
            pop()
        } 
    }
    move()
    {
        //console.log(this.sprite.velocity.heading());
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
        // Movement code adapted from Craig Reynold's autonomous steering behaviors
        // See: http://www.red3d.com/cwr/
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
                if (typeof l[i] == "object" && m[i].launched == true) 
                {
                    //console.log(l[i]);
                    if (this.sprite.overlap(l[i].sprite)) 
                    {
                        //console.log("COLLISION");
                        console.log("HIT1");
                        this.sprite.remove();
                        if (this.multi == false)
                        {
                            l[i].sprite.remove();
                            l.splice(i, 1, "None");
                        }
                        else
                        {
                            m[this.id][this.id2].sprite.remove();
                            m[this.id].splice(this.id2,1);
                            l[i].sprite.remove();
                            console.log("HIT");
                            //l.splice(i, 1, "None");
                        }
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
                if (typeof m[i] == "object") 
                {
                    if (this.multi == true && m[i].length > 0)
                    {
                      for(let j=0;j<m[i].length;j++)
                      {
                        if (this.sprite.overlap(m[i][j].sprite) && m[i][j].launched == true && this.id2 != m[i][j].id2)
                        {
                            //console.log(m[i][j].id2);
                            this.sprite.remove();
                            m[i][j].sprite.remove();
                            m[i].splice(j,1);
                        }
                      }
                        
                    }
                    else if (this.sprite.overlap(m[i].sprite) && m[i].launched == true) 
                    {
                        //console.log("COLLISION");

                        this.sprite.remove();
                        if (m[i].multi == false)
                        {
                            m[i].sprite.remove();
                            m.splice(i, 1, "None");
                        }
                        //s_explode.play();
                        
                    }
                }
            }
        }

        //Player Collision
        if (this.sprite.overlap(p))
        {
            if (this.multi == true)
            {
                m[this.id][this.id2].sprite.remove();
                m[this.id].splice(this.id2,1);
            }
            else
            {
                this.sprite.remove();
            }
            
            //console.log("Player Dead")
            health -= 1;
            
            s_hurt.play();
        }
        
        //General Detection
        if (this.sprite.removed && this.multi == false)
        {
            m.splice(this.id, 1, "None");
            s_explode.play();
            //console.log(m);
            //console.log(l);
        }

    }
    update()
    {
        if (this.launched == false && this.sprite.overlap(l[this.id].sprite) == false)
        {
            this.launched = true;
            //console.log("LAUNCH");
        }
        if (this.launched == true)
        {
            this.collision();
        }
        
    }
}