class Launcher
{
    constructor(id_)
    {
        this.id = id_;
        this.sprite = createSprite(random(0, width), random(0, height), 60, 60);
        this.sprite.visible = false;
        this.color = color(random(0,255),random(0,255),random(0,255));
    }
    render()
    {
        if (this.sprite.removed == false)
        {
            rectMode(CENTER);
            fill(this.color);
            rect(this.sprite.position.x,this.sprite.position.y, 60,60);
        }

    }

}