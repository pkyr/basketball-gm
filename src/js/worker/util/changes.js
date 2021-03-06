// @flow

import {idb} from '../db';
import {logEvent} from '../util';
import type {Conditions} from '../../common/types';

const all = [{
    date: "2013-09-21",
    msg: "The \"What would make this deal work?\" button can add assets from either team, either to make a trade good enough for the AI to accept or to have the AI offer up assets to entice the user. Previously, it would only add assets from the user's team to make the trade better for the AI.",
}, {
    date: "2013-09-21",
    msg: "Added a \"Trading Block\" page where you can ask all the AI teams to make offers for selected players or draft picks you control.",
}, {
    date: "2013-09-22",
    msg: "For any games simulated from now on, box scores will show quarter-by-quarter point totals.",
}, {
    date: "2013-10-01",
    msg: "New mobile-friendly UI - try playing in Chrome or Firefox on your Android device!",
}, {
    date: "2013-10-02",
    msg: '<a href="https://twitter.com/basketball_gm" target="_blank">Follow Basketball GM on Twitter</a> to keep up with the latest news, updates, and discussion.',
}, {
    date: "2013-10-16",
    msg: "Added fantasy draft feature - try it out by clicking Tools > Fantasy Draft!",
}, {
    date: "2013-10-22",
    msg: "More realistic free agency. Free agency now lasts 30 days. The longer you wait to sign someone, the better deal you can get - but if you wait to long, he might sign with an other team. Also, you are now much less likely to get the first shot at signing every free agent.",
}, {
    date: "2013-11-03",
    msg: "Live play-by-play game simulation. Click \"Play > One day (live)\" to check it out.",
}, {
    date: "2013-11-10",
    msg: "Removed the roster size limit in trades. Now you (and AI teams) can go above and below the min and max roster sizes, as long as you get back within the limits before playing any more games.",
}, {
    date: "2013-11-24",
    msg: "Key events (wins/losses, injuries, etc.) now appear in notification bubbles when they happen.",
}, {
    date: "2013-12-21",
    msg: "At the end of each season, a Finals MVP will be selected along with the other awards.",
}, {
    date: "2014-01-03",
    msg: "The Player Stats page can show career stats in addition to season stats. Also, it can show total stats and per 36 minute stats in addition to per game stats.",
}, {
    date: "2014-01-11",
    msg: "To improve game simulation performance in old leagues, you can delete some of the old stored data by going to Tools > Improve Performance.",
}, {
    date: "2014-01-13",
    msg: "You can view upcoming draft classes up to three years in the future by going to Players > Draft and then clicking Future Draft Scouting.",
}, {
    date: "2014-01-20",
    msg: 'Want to help pick new default team names? <a href="http://www.reddit.com/r/BasketballGM/comments/1voggc/survey_basketball_gm_is_renaming_its_teams_vote/" target="_blank">Click here to learn more and vote in our poll!</a>',
}, {
    date: "2014-01-21",
    msg: "By clicking the flag icon next to players' names, you can add them to the Watch List (accessible from Players > Watch List) to keep an eye on them.",
}, {
    date: "2014-01-30",
    msg: "New Create A Player feature, under the Tools menu.",
}, {
    date: "2014-02-15",
    msg: '<a href="https://basketball-gm.com/blog/2014/02/new-improved-trade-ai/" target="_blank">Big changes to the trade AI</a>, which hopefully will fix some loopholes and make things more realistic.',
}, {
    date: "2014-03-03",
    msg: '<a href="https://basketball-gm.com/blog/2014/03/new-feature-achievements/" target="_blank">Achievements!</a>',
}, {
    date: "2014-03-05",
    msg: 'Upcoming Free Agents page, accessible from Players > Free Agents.',
}, {
    date: "2014-04-27",
    msg: 'Player Stats and Player Ratings pages now let you easily filter by team.',
}, {
    date: "2014-06-17",
    msg: 'New customization features: <a href="https://basketball-gm.com/blog/2014/06/new-customization-features-full-league-importexport-and-draft-class-import/">full league import/export and custom draft class import</a>.',
}, {
    date: "2014-07-05",
    msg: 'New "God Mode" allows you to create players, edit players, and force trades. Enable it by going to Tools > God Mode within a league.',
}, {
    date: "2014-09-28",
    msg: 'Player development should now be much more realistic. <a href="https://basketball-gm.com/blog/2014/09/revamped-player-development-algorithm/">Check out the blog for more.</a>',
}, {
    date: "2014-12-05",
    msg: 'Game simulation is about 20% faster now. This is most visible after you\'re many seasons into a league.',
}, {
    date: "2015-01-31",
    msg: 'Want to really nerd out? Go to Tools > Export Stats.',
}, {
    date: "2015-02-03",
    msg: 'Keep an eye on great individual performances in the new Statistical Feats page.',
}, {
    date: "2015-03-15",
    msg: 'Did something cool in the game that you want to share? Go to Tools > Screenshot from any page.',
}, {
    date: "2015-03-21",
    msg: 'Enable God Mode (in the Tools menu) and then go to Tools > Multi Team Mode for some new ways to play!',
}, {
    date: "2015-05-06",
    msg: 'Two new stats are tracked: blocks against and +/-',
}, {
    date: "2015-09-16",
    msg: 'New pages: Transactions (available in the League menu), and Team Records and Awards Records (available under League > History).',
}, {
    date: "2016-01-14",
    msg: 'Contract negotiation has been revamped and streamlined.',
}, {
    date: "2016-01-31",
    msg: 'Serious injuries will now sometimes result in <a href="https://basketball-gm.com/blog/2016/01/injuries-can-have-long-term-effects/">decreased athleticism ratings</a>.',
}, {
    date: "2016-02-06",
    msg: 'Lots of new options in God Mode - change the salary cap, the length of games, the number of games in a season, disable injuries, etc.',
}, {
    date: "2016-05-28",
    msg: 'The Edit Team Info feature is now only available in God Mode.',
}, {
    date: "2016-06-04",
    msg: 'The default teams now have logos.',
}, {
    date: "2016-06-13",
    msg: "International players are here! And American players have more realistic names. Gameplay hasn't changed at all, this is purely cosmetic at this point.",
}, {
    date: "2017-04-01",
    msg: '<a href="https://basketball-gm.com/blog/2017/04/basketball-gm-4-0-is-here/">Basketball GM 4.0 is here!</a> This is not an April Fool\'s Day joke! Everything should be crazy fast now.',
}, {
    date: "2017-05-21",
    msg: "AI teams will now trade with each other. Go to League > Transactions to see trades.",
}, {
    date: "2017-06-07",
    msg: "By default, box scores from past seasons will be deleted to save hard drive space. To diasble this new behavior, go to Tools > Options.",
}];

const check = async (conditions: Conditions) => {
    const changesRead = await idb.meta.attributes.get('changesRead');

    // Don't show anything on first visit
    if (changesRead < 0) {
        await idb.meta.attributes.put(all.length, 'changesRead');
        return;
    }

    if (changesRead < all.length) {
        const unread = all.slice(changesRead);

        let text = "";
        let linked = false;

        for (let i = 0; i < unread.length; i++) {
            if (i > 0) {
                text += "<br>";
            }
            text += `<strong>${unread[i].date}</strong>: ${unread[i].msg}`;
            if (i >= 2 && (unread.length - i - 1) > 0) {
                linked = true;
                text += `<br><a href="/changes">...and ${unread.length - i - 1} more changes.</a>`;
                break;
            }
        }

        if (!linked) {
            text += '<br><a href="/changes">View All Changes</a>';
        }

        logEvent({
            type: "changes",
            text,
            saveToDb: false,
        }, conditions);

        await idb.meta.attributes.put(all.length, 'changesRead');
    }
};

export default {
    all,
    check,
};
