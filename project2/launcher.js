class Launcher
{
    constructor(id_,x_init,y_init,h_init)
    {
        this.id = id_;
        this.h = h_init;
        this.sprite = createSprite(x_init, y_init, 60, 60);
        this.sprite.visible = false;
        this.color = color(random(0,255),random(0,255),random(0,255));
        this.sprite.rotation = h_init;
        console.log(h_init);
    }
    render()
    {
        if (this.sprite.removed == false)
        {
            push();
            rectMode(CENTER);
            translate(this.sprite.position.x,this.sprite.position.y)
            rotate(this.sprite.rotation);
            //rotate(this.h);
            fill(this.color);
            rect(0,0, 60,60);
            pop();
        }

    }

}