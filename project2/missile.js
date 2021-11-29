class Missile
{
    constructor(id_)
    {
        this.id = id_
        this.sprite = createSprite(0,0, 50, 50);
        this.sprite.topSpeed = -1;
        this.sprite.friction = .01;
        this.sprite.position.x = l[this.id].position.x;
        this.sprite.position.y = l[this.id].position.y;
        this.launched = false;
    }
    render()
    {
        push()
        translate(this.sprite.position.x, this.sprite.position.y);
        rotate(this.sprite.velocity.heading());//this.sprite.rotation);
        triangle(20, 0, -20, 20, -20, -20);
        pop()
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
        if (this.sprite.overlap(l[this.id])) 
        {
            console.log("COLLISION");
            this.sprite.visible = false;
            this.sprite.remove();
            l[this.id].remove();
            m.splice(0, 1);
            console.log(m);
        }
    }
    update()
    {
        if (this.launched == false && this.sprite.overlap(l[this.id]) == false)
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