class Explosion
{
  constructor(x_,y_,r_)
  {
    this.x = x_;
    this.y = y_;
    this.r = 0;
    this.endR = r_;
    this.colList = [255,255,255];
    this.color = color(245,176,68);
    this.outline = color(getOutline(245,176,68));
  }
  render()
  {
    
    this.r += 5;
    
    this.colList[1] -= 5;
    this.colList[2] -= 10;
    /*
    for (let j=0;j<this.colList.length;j++)
    {
      this.colList[j] += 10;
      
      if (this.colList[j] < 0)
      {
        this.colList[j] = 0;
      }
      
    }
    */
    
    console.log(this.colList);
    
    if (this.r > this.endR-25)
    {
      this.color = color(this.colList[0],this.colList[1],this.colList[2],map(this.r,75,150,255,0));
      this.outline = color(getOutline(this.colList[0],this.colList[1],this.colList[2],map(this.r,75,150,255,0)));
      //this.color = color(100);
      //this.outline = color(90);
    }
    else
    {
      this.color = color(this.colList[0],this.colList[1],this.colList[2]);
      this.outline = color(getOutline(this.colList[0],this.colList[1],this.colList[2]));
    }
    
    fill(this.color);
    stroke(this.outline);
    ellipse(this.x,this.y,this.r,this.r)
    if (this.r>this.endR)
    {
      for (let i = 0; i<e.length; i++)
      {
        if (e[i].x == this.x)
        {
          e.splice(i,1);
        }
      }
    }
  }
}