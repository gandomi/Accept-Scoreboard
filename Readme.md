#Accept Scoreboard

The scoreboard of Accept contests...

With this code you can make PC2 scorboard more beautiful and more readable for Contestants, Coaches and Closing ceremony...

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

1. <kbd>scoreboard.html</kbd> containts main table. Contestants should open this file.
2. <kbd>coach_scoreboard.html</kbd> is same as _scoreboard.html_ and has **Auto Scroll** feature. You can use this file for **Coaches** and big display **in the hall**.
3. If you freeze scoreboard (closing `pc2_board` app) at the end of the contest and you want judge last runs with beautiful motions and effects in the closing ceremony, <kbd>closing_ceremony_scoreboard.html</kbd> is suitable for you.
 It compares the final and before freeze scoreboards and changes the background color of differences to yellow.
 You can click on yellow cells and see the result.
 This file has a feature to [**show team picture**](#how-to-show-team-picture-in-closing-ceremony-scoreboard? "How to use it?") when you click on team name column.

## How to use closing ceremony scoreboard?

When you freeze the scoreboard, you should make a **backup** from `<Path-To-PC2-Directory>/bin/html` directory **in another place**.
After the end of the contest, please run `pc2_board` app to update all scoreboard files. 
Then rename <kbd>summary.html</kbd> to <kbd>summary_final.html</kbd> (Located in `<Path-To-PC2-Directory>/bin/html`) and copy it to backed up folder.
Then run <kbd>closing_ceremony_scoreboard.html</kbd> (**in the backed up directory**), click on yellow cells and see the result.
 
## How to show team picture in closing ceremony scoreboard?
If you want show **team picture** in closing ceremony scoreboard, you must place all team picture in `team_pic` directory and name them in this format:

- `<team name>.JPG`

> Note: `<team name>` should same as the team names in the scoreboard name column (without university name).

For example the picture of first team in accept 2 & 3 is located in `team_pic` directory.