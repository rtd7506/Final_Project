class Missile
{
    constructor(id_)
    {
        this.id = id_;
        this.sprite = createSprite(0,0, 50, 50);
        this.sprite.topSpeed = -1;
        this.sprite.friction = .01;
        this.sprite.position.x = l[this.id].sprite.position.x;
        this.sprite.position.y = l[this.id].sprite.position.y;
        this.launched = false;
        this.sprite.visible = false;
        this.color = l[this.id].color;
        //this.sprite.life = random(500,750); //Life System
    }
    render()
    {
        if (this.sprite.removed == false)
        {
            fill(this.color);
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
        this.sprite.acceleration.setMag(.1);
        this.sprite.velocity.add(this.sprite.acceleration);
        this.sprite.velocity.limit(this.sprite.topspeed);
        this.sprite.position.add(this.sprite.velocity);
        this.sprite.rotate = this.sprite.rotation;
    }
    collision()
    {
        if (l.length > 0)
        {
            for (let i = 0; i < l.length; i++) 
            {
                if (typeof l[i] != "string") 
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

                    if (this.sprite.removed)
                    {
                        m.splice(this.id, 1, "None");
                        
                        console.log(m);
                        console.log(l);
                    }
                }
            }
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