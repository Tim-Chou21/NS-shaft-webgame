# Software Studio 2018 Spring Assignment 02 小朋友下樓梯

## 小朋友下樓梯
<img src="example01.png" width="700px" height="500px"></img>

## Goal
1. **Fork the repo ,remove fork relationship and change project visibility to public.**
2. Complete a game "小朋友下樓梯" by Phaser. (JavaScript or TypeScript)
3. Your game should reach the basic requirements.
4. You can download needed materials from some open source webpage to beautify the appearance.
5. Commit to "your" project repository and deploy to Gitlab page.
6. **Report which items you have done and describing other functions or feature in REABME.md.**

## Scoring 
|                                              Item                                              | Score |
|:----------------------------------------------------------------------------------------------:|:-----:|
| A complete game process: start menu => game view => game over => quit or play again            |  20%  |
| Your game should follow the basic rules of  "小朋友下樓梯".                                    |  15%  |
|         All things in your game should have correct physical properties and behaviors.         |  15%  |
| Set up some interesting traps or special mechanisms. .(at least 2 different kinds of platform) |  10%  |
| Add some additional sound effects and UI to enrich your game.                                  |  10%  |
| Store player's name and score in firebase real-time database, and add a leaderboard to your game.        |  10%  |
| Appearance (subjective)                                                                        |  10%  |
| Other creative features in your game (describe on README.md)                                   |  10%  |

## Reminder
* Do not make any change to our root project repository.
* Deploy your web page to Gitlab page, and ensure it works correctly.
    * **Your main page should be named as ```index.html```**
    * **URL should be : https://[studentID].gitlab.io/Assignment_02**
* You should also upload all source code to iLMS.
    * .html or .htm, .css, .js, .ts, etc.
    * source files
* **Deadline: 2018/05/24 23:59 (commit time)**
    * Delay will get 0 point (no reason)
    * Copy will get 0 point
    * "屍體" and 404 is not allowed


## Website Detail Description
    主要分為兩個網頁，一個是遊戲中的網頁和登入的網頁。

    登入的網頁與上次一樣，一樣是將助教給的範例貼上來使用。

    接下來開始說明遊戲

    我將整個遊戲分成7個state，分別是boot,load,scoreboard,index,menu,win,multiplayer，在boot,load這兩個state中該做的只有將遊戲的物理引擎打開並成功跳轉跳去menu這個state，再來是menu，在選單中有三個選項，分別是單人模式,雙人模式,排行榜，若選擇單人模式則會跳到index這個state，若選擇雙人模式則會跳到multiplayer這個state，最後若選擇排行榜的話則會跳去scoreboard這個state。
    首先，必須先登入才能進行遊戲。
    進入遊戲後，不論是單人或雙人模式，死亡後皆會跳去win這個state，進去後再按ESC即可回到menu。


    -----menu-----
   <img src = '/public/menuimg.png'></img>

   -----1 player-----
   <img src = '/public/oneplayer.png'></img>

   -----2 player-----
   <img src = '/public/twoplayer.png'></img>

   -----score-----
   <img src =  '/public/scoreimg.png'></img>

   -----dead------
   <img src = '/public/dead.png'></img>
