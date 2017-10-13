#Accept Scoreboard

The scoreboard of Accept contests...

With this code you can make PC2 scorboard more beautiful for Contestants, Coaches and Closing ceremony...

> **Tested on These PC2 Versions:**
> - 9.3.2
> - 9.5.2

## How to use?

#### Clone the repo

```
git clone https://github.com/gandomi/Accept-Scoreboard.git
```

#### Copy files

> Note: In the following steps, Please replace `<Path-To-PC2-Directory>` with PC2 directory path on your system.

 - Copy & replace <kbd>summary.xsl</kbd> to `<Path-To-PC2-Directory>/data/xsl`

 - Copy the following files and folders to `<Path-To-PC2-Directory>/bin/html` and make them accessible with your prefered method (Such as installing web server...)

>  - css/
>  - img/
>  - js/
>  - coach_scoreboard.html
>  - scoreboard.html
>  - closing_ceremony_scoreboard.html

## Tips

1. <kbd>scoreboard.html</kbd> containts main stylish table. Contestants should open this file.
2. <kbd>coach_scoreboard.html</kbd> is same as _scoreboard.html_ and has **Auto Scroll** feature. You can use this file for **Coaches** and big display **in the hall**.
3. If you freeze scoreboard (close `pc2_board` app) at the end of the contest <kbd>closing_ceremony_scoreboard.html</kbd> judges last runs with beautiful motions and effects.
It compares the final and before freeze scoreboards and changes the background color of differences to yellow.  

##### How to use closing ceremony scoreboard

When you freeze the scoreboard, you should make a **backup** from `<Path-To-PC2-Directory>/bin/html` directory **in another place**.
After the end of the contest and run `pc2_board` app to update all scoreboard files. 
Then rename <kbd>summary.html</kbd> to <kbd>summary_final.html</kbd> (Located in `<Path-To-PC2-Directory>/bin/html`) and copy it to backed up folder.
Then run <kbd>closing_ceremony_scoreboard.html</kbd>, click on yellow cells and see the result. 