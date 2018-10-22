import React from 'react';
import HomeView from '../../src/containers/screens/home/HomeView';
import store from '../../src/redux/store';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { NativeModules } from 'react-native';

configure({ adapter: new Adapter() })

describe('HOME VIEW ', () => {
	jest.mock('WebView');
	const props = {
		navigation: {
			setParams: jest.fn(),
			getParam: jest.fn(),
			navigate: jest.fn()
		},
		newsList: '',
	};
	const allNews = {
		"status": "ok",
		"totalResults": 20,
		"articles": [
			{
				"source": {
					"id": "reuters",
					"name": "Reuters"
				},
				"author": null,
				"title": "Bodies of mother clutching baby found as Indonesia quake toll rises above 1500",
				"description": null,
				"url": "https://www.reuters.com/article/us-indonesia-quake/bodies-of-mother-clutching-baby-found-as-indonesia-quake-toll-rises-above-1500-idUSKCN1MD2JE",
				"urlToImage": null,
				"publishedAt": "2018-10-05T09:38:39Z",
				"content": null
			},
			{
				"source": {
					"id": null,
					"name": "Thestreet.com"
				},
				"author": "Joseph Woelfel",
				"title": "Jobs Report, Elon Musk, China Spy Chips and Costco - 5 Things You Must Know",
				"description": "U.S. stock futures fall while government bond yields edge higher as investors prepare for the U.S. jobs report; economists expect the U.S. to have added 183,000 jobs in September, down from 201,000 in August; a tweet from Elon Musk's official Twitter account …",
				"url": "https://www.thestreet.com/markets/5-things-you-must-know-before-the-market-opens-friday-14733681",
				"urlToImage": "http://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/d93762cc-c67c-11e8-b433-379a1f941450.jpg",
				"publishedAt": "2018-10-05T09:31:13Z",
				"content": "Here are five things you must know for Friday, Oct. 5: 1. -- Stocks Fall, Bond Yields Rise Ahead of Jobs Report U.S. stock futures were lower on Friday, Oct. 5, while government bond yields around the world continued to edge higher as investors prepared for t… [+4877 chars]"
			},
			{
				"source": {
					"id": "the-new-york-times",
					"name": "The New York Times"
				},
				"author": null,
				"title": "Nobel Peace Prize Awarded to Denis Mukwege and Nadia Murad for Fighting Sexual Violence",
				"description": "The Nobel Committee said the Congolese surgeon and former ISIS captive were rewarded “for their efforts to end the use of sexual violence as a weapon of war and armed conflict.”",
				"url": "https://www.nytimes.com/2018/10/05/world/nobel-peace-prize.html",
				"urlToImage": "https://static01.nyt.com/images/2018/10/05/world/europe/06nobel-combo/05us-ambriefing-nobel-facebookJumbo.jpg",
				"publishedAt": "2018-10-05T09:09:02Z",
				"content": "He spent more than two months in exile but decided that, in spite of the risk, he had to return. “To treat women for the first time, second time, and now I’m treating the children born after rape,” Dr. Mukwege said. “This is not acceptable.” Ms. Murad was abd… [+1363 chars]"
			},
			{
				"source": {
					"id": "the-washington-post",
					"name": "The Washington Post"
				},
				"author": null,
				"title": "Here's why confirming Kavanaugh could seriously undermine the Supreme Court's public standing",
				"description": "Along with Gorsuch, Kavanaugh would have been appointed by a president who lost the popular vote and confirmed by senators representing a minority of the U.S. population.",
				"url": "https://www.washingtonpost.com/news/monkey-cage/wp/2018/10/05/heres-why-confirming-kavanaugh-could-seriously-undermine-the-supreme-courts-public-standing/",
				"urlToImage": "https://www.washingtonpost.com/resizer/7ztoXaY4Z3MxKPzZtnjHG0HJITE=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/WXAR224CO4ZA3LIM6NS27ZNTJA.jpg",
				"publishedAt": "2018-10-05T09:02:23Z",
				"content": "Could Brett Kavanaugh’s nomination undermine the public standing of the Supreme Court? Observers like The Atlantic’s Ron Brownstein think so. “Every time [Chief Justice John] Roberts would lean on Kavanaugh to construct a majority,” Brownstein writes, “the ch… [+4407 chars]"
			}, {
				"source": {
					"id": null,
					"name": "Espn.com"
				},
				"author": null,
				"title": "Red Sox heavy on heroes in amazing Game 4 win",
				"description": "From Andrew Benintendi's game-saving catch to another big homer by Jackie Bradley Jr., there were plenty of heroes in Boston's Game 4 thriller.",
				"url": "http://www.espn.com/mlb/story/_/id/25013240/mlb-boston-red-sox-heavy-heroes-amazing-game-4-win",
				"urlToImage": "http://a.espncdn.com/combiner/i?img=%2Fphoto%2F2018%2F1017%2Fr448647_1296x729_16%2D9.jpg",
				"publishedAt": "2018-10-18T08:04:56Z",
				"content": "HOUSTON -- After Andrew Benintendi had made his remarkable, game-saving, game-ending catch that left a skid mark of churned-up grass in the Minute Maid Park outfield, and after Mookie Betts had made the throw of his career, and after Jackie Bradley Jr. had ho… [+10062 chars]"
			},
			{
				"source": {
					"id": null,
					"name": "Bbc.com"
				},
				"author": "https://www.facebook.com/bbcnews",
				"title": "Jamal Khashoggi disappearance: Last column published",
				"description": "Jamal Khashoggi's column is published as search of the Saudi consulate in Istanbul continues.",
				"url": "https://www.bbc.com/news/world-middle-east-45899285",
				"urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/959D/production/_103910383_cf706c93-4d34-4f43-bfc6-75c63f969a06.jpg",
				"publishedAt": "2018-10-18T07:58:48Z",
				"content": "Image copyright AFP Image caption Turkish officers again searched the Saudi consulate in Istanbul on Wednesday and Thursday The Washington Post has published missing Saudi journalist Jamal Khashoggi's last column - a call for press freedom across the Arab wor… [+5787 chars]"
			},
			{
				"source": {
					"id": null,
					"name": "Bbc.com"
				},
				"author": "https://www.facebook.com/bbcnews",
				"title": "Brexit: UK to consider longer transition period",
				"description": "Theresa May says the post-Brexit transition could be extended \"by a matter of months\".",
				"url": "https://www.bbc.com/news/uk-politics-45897253",
				"urlToImage": "https://ichef.bbci.co.uk/images/ic/1024x576/p06p3ls4.jpg",
				"publishedAt": "2018-10-18T07:28:05Z",
				"content": "Media caption BBC Europe editor Katya Adler looks at how united the EU really is over Brexit The UK's transition out of the EU could be extended by \"a matter of months\" to ensure no hard border in Northern Ireland, Theresa May has said. The prime minister sai… [+2604 chars]"
			},
			{
				"source": {
					"id": null,
					"name": "Insidehighered.com"
				},
				"author": null,
				"title": "Fixed Maximum Terms for Student Visas?",
				"description": "Trump administration plans to set new time limits for student visas to reduce overstays. Advocates for international exchange see the move as one that could hurt America's ability to compete for international students.",
				"url": "https://www.insidehighered.com/news/2018/10/18/planned-rule-would-establish-maximum-period-stay-student-visa-holders",
				"urlToImage": "https://www.insidehighered.com/sites/default/server_files/media/Fvisa.jpg",
				"publishedAt": "2018-10-18T07:01:40Z",
				"content": "The Trump administration published notice on Wednesday that it intends to propose a new rule in fall 2019 establishing a maximum period of authorized stay for international students and other holders of certain nonimmigrant visas. The government says the plan… [+5172 chars]"
			}, {
				"source": {
					"id": "the-washington-post",
					"name": "The Washington Post"
				},
				"author": "https://www.facebook.com/FactChecker",
				"title": "Just about everything you've read on the Warren DNA test is wrong",
				"description": "Reporters and politicians rushed to say the test shows she was only 1/1024th Native American. But that's a huge misinterpretation of the data.",
				"url": "https://www.washingtonpost.com/politics/2018/10/18/just-about-everything-youve-read-warren-dna-test-is-wrong/",
				"urlToImage": "https://www.washingtonpost.com/resizer/LQIVDJx55G8o4E7qAnSQpXHJWSA=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/34JQQQWRPII6RJG3DBBRDUTRFE.jpg",
				"publishedAt": "2018-10-18T07:00:44Z",
				"content": "“Warren might even be less Native American than the average European American.” — news release from the Republican National Committee, Oct. 15, 2018 “Pocahontas (the bad version), sometimes referred to as Elizabeth Warren, is getting slammed. She took a bogus… [+7744 chars]"
			},
			{
				"source": {
					"id": "the-new-york-times",
					"name": "The New York Times"
				},
				"author": null,
				"title": "Steve Penny, Former USA Gymnastics Chief, Arrested on Evidence Tampering Charge",
				"description": "Penny is accused of interfering in an investigation of Lawrence G. Nassar, the national gymnastics team doctor who is serving 40 to 175 years in prison for sexual abuse.",
				"url": "https://www.nytimes.com/2018/10/18/sports/steve-penny-gymnastics-arrest-tampering.html",
				"urlToImage": "https://static01.nyt.com/images/2018/10/18/sports/18pennyweb/18pennyweb-facebookJumbo.jpg",
				"publishedAt": "2018-10-18T06:09:30Z",
				"content": "The training center, known as the Karolyi Ranch, is owned by Bela and Martha Karolyi, who are among the most prominent coaches in gymnastics history. The ranch is about 60 miles north of Houston, inside Sam Houston National Forest. At a national team training… [+1212 chars]"
			},
			{
				"source": {
					"id": null,
					"name": "Nj.com"
				},
				"author": "Kevin Manahan | NJ Advance Media for NJ.com",
				"title": "Milwaukee Brewers vs. Los Angeles Dodgers RECAP, SCORE, STATS (10/17/18) NLCS Game 5",
				"description": "The Milwaukee Brewers, tied 2-2 in the best of seven National League Championship Series, meet the Los Angeles Dodgers in game 5 on Wednesday, October 17, 2018 (10/17/18) at Dodger Stadium in Los Angeles, California. Wade Miley will be the starting pitcher fo…",
				"url": "https://www.nj.com/sports/index.ssf/2018/10/milwaukee_brewers_vs_los_angeles_dodgers_live_scor_1.html",
				"urlToImage": "https://image.nj.com/home/njo-media/width620/img/realtimesports_impact/photo/24966019-standard.jpg",
				"publishedAt": "2018-10-18T04:32:00Z",
				"content": "The Milwaukee Brewers, tied 2-2 in the best-of-seven National League Championship Series, meet the Los Angeles Dodgers in Game 5 on Wednesday, October 17, 2018 (10/17/18) at Dodger Stadium in Los Angeles, California. Wade Miley will be the starting pitcher fo… [+9886 chars]"
			},
			{
				"source": {
					"id": "the-washington-post",
					"name": "The Washington Post"
				},
				"author": null,
				"title": "White House counsel Donald McGahn officially leaves the job",
				"description": "McGahn, who is replaced by veteran Washington lawyer Pat Cipollone, said goodbye to President Trump on Wednesday, sources said.",
				"url": "https://www.washingtonpost.com/politics/white-house-counsel-don-mcgahn-officially-leaves-the-job/2018/10/17/d42bf59a-d27b-11e8-a275-81c671a50422_story.html",
				"urlToImage": "https://www.washingtonpost.com/resizer/Rkuk4Ai0Rnyy10jmlYSky0QmMtY=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/KRZRVIWSPUI6RA6WFEP45LJKWE.jpg",
				"publishedAt": "2018-10-18T02:33:48Z",
				"content": "White House counsel Donald McGahn officially left the administration on Wednesday, according to a senior White House official and another person briefed on his departure — ending a tenure marked by a significant reshaping of the federal judiciary but also cla… [+2567 chars]"
			},
		]
	};
	const newHeadLines = {
		"status": "ok",
		"totalResults": 20,
		"articles": [
			{
				"source": {
					"id": "cbsnews",
					"name": "CBS News"
				},
				"author": "CBS/AP",
				"title": "Missing Wisconsin girl was home when parents were shot to death, sheriff says",
				"description": "Missing Wisconsin girl's parents were shot to death in their house while the girl was home,",
				"url": "https://www.cbsnews.com/news/jaymeclossmissingwisconsingirlwashomewhenparentswereshottodeathsheriffsays/",
				"urlToImage": "https://cbsnews1.cbsistatic.com/hub/i/r/2018/10/16/7bf00a65a8d8406492bcda02ad919cf7/thumbnail/1200x630/e19e31e3a7005c8e6262f30bca4df98d/ctm1016missingwisconsingirljaymecloss.jpg",
				"publishedAt": "20181018T10:38:00Z",
				"content": "MADISON, Wis.  A missing Wisconsin girl's parents were shot to death in their house while the girl was home, authorities said as they urged the public to keep phoning in tips about her whereabouts. Investigators have been searching for 13yearold Jayme Clo… [+2098 chars]"
			},
			{
				"source": {
					"id": "nbcnews",
					"name": "NBC News"
				},
				"author": "Paul A. Eisenstein",
				"title": "Legalized marijuana linked to a sharp rise in car crashes",
				"description": "There has been an increase by up to 6 percent in the number of highway crashes in four of the states where the recreational use of marijuana has been legalized.",
				"url": "https://www.nbcnews.com/business/consumer/legalizedmarijuanalinkedsharprisecarcrashesn921511",
				"urlToImage": "https://media3.snbcnews.com/j/newscms/2018_42/2609196/181018marijuanacrashmc1133_6b441231553947df8e4fac9b30b9e6c6.1200;630;7;70;5.JPG",
				"publishedAt": "20181018T10:31:53Z",
				"content": "Get breaking news alerts and special reports. The news and stories that matter, delivered weekday mornings. SUBSCRIBE There has been an increase by up to 6 percent in the number of highway crashes in four of the states where the recreational use of marijuana … [+4192 chars]"
			},
			{
				"source": {
					"id": "techcrunch",
					"name": "TechCrunch"
				},
				"author": null,
				"title": "Take a video tour of Facebook's election security war room",
				"description": null,
				"url": "https://techcrunch.com/2018/10/18/facebookelectionwarroom/",
				"urlToImage": null,
				"publishedAt": "20181018T10:00:51Z",
				"content": null
			},
			{
				"source": {
					"id": "time",
					"name": "Time"
				},
				"author": "Associated Press",
				"title": "Wounded to Be Airlifted to Russia After Deadly Crimea School Attack",
				"description": "At least 10 people will be airlifted to hospitals in Russia after a shooting and bomb attack at a vocational school in Crimea",
				"url": "http://time.com/5428135/crimeashootingwoundedairliftedrussia/",
				"urlToImage": "https://timedotcom.files.wordpress.com/2018/10/gettyimages1052433292.jpg?quality=85",
				"publishedAt": "20181018T09:09:16Z",
				"content": "(MOSCOW) — At least 10 of the wounded in a school shooting and bomb attack carried out by a student at a vocational school in Crimea will be airlifted to hospitals in Russia, the health minister said Thursday. An 18yearold student went on a rampage at the s… [+1444 chars]"
			},
			{
				"source": {
					"id": "thewashingtonpost",
					"name": "The Washington Post"
				},
				"author": null,
				"title": "'Davos in the Desert': Once a sign of Saudi Arabia's clout, the spectacle now highlights its isolation",
				"description": "The gleaming investment conference makes plain the public influence that Saudi Arabia is able to exert using private business relationships.",
				"url": "https://www.washingtonpost.com/news/morningmix/wp/2018/10/18/davosinthedesertonceasignofsaudiarabiascloutthespectaclenowhighlightsitsisolation/",
				"urlToImage": "https://www.washingtonpost.com/resizer/MiWLsKx_bXlkqpT1KyV771evnx4=/1484x0/arcanglerfishwashpostprodwashpost.s3.amazonaws.com/public/6NS5D7W7AEZARCPCGBXYIHZ57A.jpg",
				"publishedAt": "20181018T09:03:51Z",
				"content": "Last year, the government of Saudi Arabia pledged to provide half the cash for a $40 billion fund announced by the multinational asset management firm Blackstone Group for investment in infrastructure projects in the United States. The eyebrowraising announc… [+10328 chars]"
			},
			{
				"source": {
					"id": "reuters",
					"name": "Reuters"
				},
				"author": "Elizabeth Piper",
				"title": "To overcome Brexit impasse, May open to extending transition",
				"description": "British Prime Minister Theresa May signalled on Thursday she would consider extending a socalled transition period \"for a matter of months\" after Britain leaves the European Union, a move her critics say is a betrayal of Brexit.",
				"url": "https://www.reuters.com/article/ukbritaineusummit/toovercomebrexitimpassemayopentoextendingtransitionidUSKCN1MS0X2",
				"urlToImage": "https://s3.reutersmedia.net/resources/r/?m=02&d=20181018&t=2&i=1315989104&w=1200&r=LYNXNPEE9H0LK",
				"publishedAt": "20181018T08:10:22Z",
				"content": "BRUSSELS (Reuters)  British Prime Minister Theresa May signalled on Thursday she would consider extending a socalled transition period “for a matter of months” after Britain leaves the European Union, a move her critics say is a betrayal of Brexit. Less tha… [+4246 chars]"
			},
			{
				"source": {
					"id": "thewashingtonpost",
					"name": "The Washington Post"
				},
				"author": "https://www.facebook.com/FactChecker",
				"title": "Just about everything you've read on the Warren DNA test is wrong",
				"description": "Reporters and politicians rushed to say the test shows she was only 1/1024th Native American. But that's a huge misinterpretation of the data.",
				"url": "https://www.washingtonpost.com/politics/2018/10/18/justabouteverythingyouvereadwarrendnatestiswrong/",
				"urlToImage": "https://www.washingtonpost.com/resizer/LQIVDJx55G8o4E7qAnSQpXHJWSA=/1484x0/arcanglerfishwashpostprodwashpost.s3.amazonaws.com/public/34JQQQWRPII6RJG3DBBRDUTRFE.jpg",
				"publishedAt": "20181018T07:00:44Z",
				"content": "“Warren might even be less Native American than the average European American.” — news release from the Republican National Committee, Oct. 15, 2018 “Pocahontas (the bad version), sometimes referred to as Elizabeth Warren, is getting slammed. She took a bogus… [+7744 chars]"
			},
			{
				"source": {
					"id": "thetimesofindia",
					"name": "The Times of India"
				},
				"author": "PTI",
				"title": "Trump administration to propose major changes in H1B visas",
				"description": "US seeks to change the very definition of employment under H1B, which is popular among Indian companies.",
				"url": "https://economictimes.indiatimes.com/nri/visaandimmigration/trumpadministrationtoproposemajorchangesinh1bvisas/articleshow/66269711.cms",
				"urlToImage": "https://img.etimg.com/thumb/msid66269732,width1070,height580,imgsize311439,overlayeconomictimes/photo.jpg",
				"publishedAt": "20181018T06:02:00Z",
				"content": "The Trump administration has said it is planning to \"revise\" the definition of employment and specialty occupations under the H1B visas, a move which will have a detrimental impact on Indian IT companies and small and mediumsized contractual firms mostly ow… [+2805 chars]"
			},
			{
				"source": {
					"id": "usatoday",
					"name": "USA Today"
				},
				"author": "Nancy Armour, Rachel Axon",
				"title": "Former USA Gymnastics CEO Steve Penny arrested, indicted for tampering with evidence",
				"description": "Steve Penny is accused of having files removed from Karolyi Ranch during investigation into wrongdoing by Larry Nassar",
				"url": "https://www.usatoday.com/story/sports/2018/10/18/formerusagymnasticsceoaccusedremovingfileskarolyiranch/1680089002/",
				"urlToImage": "https://www.gannettcdn.com/presto/2018/10/18/USAT/9b58a8ea3edb48c68b570361279920e5stevepenny.JPG?crop=4207,2366,x1,y145&width=3200&height=1680&fit=bounds",
				"publishedAt": "20181018T04:04:37Z",
				"content": "Former Congresswoman Mary Bono quit her role as USA Gymnastics interim CEO amid pressure from Simone Biles, Aly Raisman and other U.S. gymnasts. USA TODAY Former USA Gymnastics president Steve Penny testifies before a Senate subcommittee about the sexabuse s… [+6193 chars]"
			},
			{
				"source": {
					"id": "thewashingtonpost",
					"name": "The Washington Post"
				},
				"author": null,
				"title": "White House counsel Donald McGahn officially leaves the job",
				"description": "McGahn, who is replaced by veteran Washington lawyer Pat Cipollone, said goodbye to President Trump on Wednesday, sources said.",
				"url": "https://www.washingtonpost.com/politics/whitehousecounseldonmcgahnofficiallyleavesthejob/2018/10/17/d42bf59ad27b11e8a27581c671a50422_story.html",
				"urlToImage": "https://www.washingtonpost.com/resizer/Rkuk4Ai0Rnyy10jmlYSky0QmMtY=/1484x0/arcanglerfishwashpostprodwashpost.s3.amazonaws.com/public/KRZRVIWSPUI6RA6WFEP45LJKWE.jpg",
				"publishedAt": "20181018T02:33:48Z",
				"content": "White House counsel Donald McGahn officially left the administration on Wednesday, according to a senior White House official and another person briefed on his departure — ending a tenure marked by a significant reshaping of the federal judiciary but also cla… [+2567 chars]"
			},
			{
				"source": {
					"id": null,
					"name": "Espn.com"
				},
				"author": null,
				"title": "Astros' Jose Altuve ruled out after fan interferes with Mookie Betts' attempt to catch fly ball",
				"description": "A potential tworun HR by the Astros' Jose Altuve was ruled an out by umpires, who said a fan interfered with Mookie Betts' catch attempt.",
				"url": "http://www.espn.com/mlb/story/_/id/25011260/faninterferesattemptbostonredsoxmookiebettscatchball",
				"urlToImage": "http://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2018%2F1017%2Fr448569_1296x729_16%2D9.jpg",
				"publishedAt": "20181018T02:30:31Z",
				"content": "HOUSTON  Controversy came early in Wednesday night's Game 4 of the American League Championship Series. In the bottom of the first inning, Houston Astros designated hitter Jose Altuve launched a fly ball to the rightfield wall that prompted Boston Red Sox … [+3717 chars]"
			},
			{
				"source": {
					"id": "thenewyorktimes",
					"name": "The New York Times"
				},
				"author": null,
				"title": "Liberal Upper West Siders Get Their Revenge: Trump Place Sign Is Coming Down",
				"description": "Tenants at 200 Riverside Boulevard voted to remove the Trump brand from their building’s signage. A judge sided with their decision.",
				"url": "https://www.nytimes.com/2018/10/17/nyregion/trumpplacesigncondomanhattan.html",
				"urlToImage": "https://static01.nyt.com/images/2018/10/18/nyregion/18TRUMPSIGN/00TRUMPSIGNfacebookJumbo.jpg",
				"publishedAt": "20181018T00:41:09Z",
				"content": "For some, the once ubiquitous Trump brand, which adorned apartment buildings, hotels, casinos, golf courses, steaks, suits and water, does not have the same appeal it used to have before Mr. Trump’s political career. Eric Chung, a longtime resident of 200 Riv… [+1100 chars]"
			},
			{
				"source": {
					"id": "thenewyorktimes",
					"name": "The New York Times"
				},
				"author": null,
				"title": "50 Years After Tet Offensive, a Marine Receives the Medal of Honor",
				"description": null,
				"url": "https://www.nytimes.com/2018/10/17/us/politics/canleymedalofhonor.html",
				"urlToImage": null,
				"publishedAt": "20181018T00:26:25Z",
				"content": null
			},
			{
				"source": {
					"id": null,
					"name": "Bustle.com"
				},
				"author": "Caroline Burke",
				"title": "Joe Biden Doesn't Want Trump Impeached Yet & His Reason Why Reveals Where His Priorities Lie",
				"description": "He might not be a fan of Donald Trump, but that doesn't mean he thinks impeachment is a good idea right now: Joe Biden revealed he doesn't want Trump impeached, at least not yet. The remarks came during a conversation with CBS This Morning. At one…",
				"url": "https://www.bustle.com/p/joebidendoesntwanttrumpimpeachedyethisreasonwhyrevealswherehisprioritieslie12601197",
				"urlToImage": "https://imgix.bustle.com/uploads/getty/2018/10/17/2f0f8feaace8486c92cdcb2977ea620cgetty948346196.jpg?w=1200&h=630&q=70&fit=crop&crop=faces&fm=jpg",
				"publishedAt": "20181018T00:10:39Z",
				"content": "He might not be a fan of Donald Trump, but that doesn't mean he thinks impeachment is a good idea right now: Joe Biden revealed he doesn't want Trump impeached, at least not yet. The remarks came during a conversation with CBS This Morning. At one point, the … [+2922 chars]"
			},
			{
				"source": {
					"id": "thenewyorktimes",
					"name": "The New York Times"
				},
				"author": null,
				"title": "Senate Truce Collapses as GOP Rush to Confirm More Judges Begins Anew",
				"description": "Last week, senators agreed to confirm one last slate of President Trump’s nominees, then recess for the midterm campaign. But on Wednesday, Republicans recommenced the judicial rush.",
				"url": "https://www.nytimes.com/2018/10/17/us/politics/senaterepublicansjudges.html",
				"urlToImage": "https://static01.nyt.com/images/2018/10/18/us/politics/18dcjudgesprint/18dcjudges1facebookJumbo.jpg",
				"publishedAt": "20181017T23:14:46Z",
				"content": "“I’m very proud of you,” Mr. Hatch told Ms. Rushing. Mr. Sasse called her an “inspired choice.” Mr. Kennedy, though, tried to draw her out with a string of offbeat questions: “Tell me about your major disappointment in life.” (She said she spent too much time… [+2299 chars]"
			},
			{
				"source": {
					"id": null,
					"name": "Npr.org"
				},
				"author": "",
				"title": "Beto O'Rourke Goes On The Attack Against Ted Cruz",
				"description": "Lagging in the polls, the Democratic Senate candidate has entered a new phase in his attempt to pull off a big upset in the Texas race for U.S. Senate. Attack ads followed a fiery debate on Tuesday.",
				"url": "https://www.npr.org/2018/10/17/658308233/betoorourkegoesonattackagainsttedcruz",
				"urlToImage": "https://media.npr.org/assets/img/2018/10/17/gettyimages1047833444_wide6d4f37683213b0ea39520144d305eb677c847aa0.jpg?s=1400",
				"publishedAt": "20181017T23:06:45Z",
				"content": "Texas Democratic Senate candidate Beto O'Rourke, seen campaigning in Houston this month, has launched his first attack ads on Republican Sen. Ted Cruz as he tries to regain traction in the last weeks of the campaign. Loren Elliott/Getty Images Texas Republica… [+3834 chars]"
			},
			{
				"source": {
					"id": "thehill",
					"name": "The Hill"
				},
				"author": "Emily Birnbaum",
				"title": "Rosenstein says Mueller probe is 'appropriate and independent'",
				"description": "Deputy Attorney General Rod Rosenstein on Wednesday defended special counsel Robert Mueller's investigation as \"appropriate and independent\" as President Trump continues to attack the probe as a \"witch hunt.\"",
				"url": "https://thehill.com/homenews/administration/411956rosensteinsaysmuellerprobeisappropriateandindependent",
				"urlToImage": "https://thehill.com/sites/default/files/rosensteinrod_100818gn3_lead.jpg",
				"publishedAt": "20181017T22:20:16Z",
				"content": "Deputy Attorney General Rod Rosenstein Rod Jay Rosenstein Rosenstein says Mueller probe is 'appropriate and independent' The Hill's 12:30 Report — Trump requests Turkey's evidence on missing journalist | Takeaways from Texas Senate debate | Key Mueller findin… [+2810 chars]"
			},
			{
				"source": {
					"id": "thewallstreetjournal",
					"name": "The Wall Street Journal"
				},
				"author": null,
				"title": "Treasury Official Charged with Leaking Sensitive Bank Information to Reporter",
				"description": null,
				"url": "https://www.wsj.com/articles/uschargestreasuryadviserwithleakingsuspiciousactivityreports1539793225",
				"urlToImage": null,
				"publishedAt": "20181017T20:17:00Z",
				"content": null
			},
			{
				"source": {
					"id": "thewashingtonpost",
					"name": "The Washington Post"
				},
				"author": "https://www.facebook.com/danielle.paquette.58",
				"title": "Trump ditches 144yearold postal pact that boosts Chinese retailers",
				"description": "The president wants to undo a 144yearold postal treaty that gave steep discounts to Chinesebased businesses.",
				"url": "https://www.washingtonpost.com/business/economy/trumpditches144yearoldpostalpactthatboostschineseretailers/2018/10/17/88aefea6d23411e88c22fa2ef74bd6d6_story.html",
				"urlToImage": "https://www.washingtonpost.com/resizer/x_lBRYlniUkR_gKEhg72Ubjwm7I=/1484x0/arcanglerfishwashpostprodwashpost.s3.amazonaws.com/public/34G67IWSG4I6RJG3DBBRDUTRFE.jpg",
				"publishedAt": "20181017T20:04:41Z",
				"content": "President Trump moved Wednesday to withdraw from a 144yearold international postal agreement that enables businesses in China to mail small packages to the United States at a hefty discount, an arrangement government officials said boosts foreign competitor… [+5077 chars]"
			},
			{
				"source": {
					"id": "usatoday",
					"name": "USA Today"
				},
				"author": null,
				"title": "First lady Melania Trump lands in Philadelphia after 'mechanical issue' aboard plane",
				"description": null,
				"url": "https://www.usatoday.com/story/life/people/2018/10/17/melaniatrumpplanereturnsairportaftermechanicalissue/1668508002/",
				"urlToImage": null,
				"publishedAt": "20181017T16:38:00Z",
				"content": null
			}
		]
	};
	it('should render "Home View"', () => {
		const wrapper = shallow(
			<HomeView {...props} dispatch={jest.fn} store={store} />
		);

		expect(wrapper.containsMatchingElement(<legend>HomeView</legend>));
	});

	it('should render "Home View" with top headlines', () => {
		const wrapper = shallow(
			<HomeView
				{...props}
				newsList={JSON.stringify(allNews)}
				dispatch={jest.fn}
				store={store}
			/>
		);
		const render = wrapper.dive();
		render.setProps({ newsList: JSON.stringify(allNews) });
		render.update();
		expect(render.props().children[3].props.children[0].props.items.length).toEqual(12)
	});

	it('Should call search when enter the words to search', () => {
		const wrapper = shallow(
			<HomeView
				{...props}
				newsList={''}
				dispatch={jest.fn}
				store={store}
			/>
		);
		const render = wrapper.dive();
		render.setProps({ newsList: JSON.stringify(allNews) });
		render.update();
		render.instance().setState({ searchQuery: 'India' });
		render.update();
		render.find('Search').forEach(child => {
			child.props().onSearch('India');
		});
		expect(render.props().children[2].props.children.props.children.props.onSearch("India")).toBeUndefined();
	});

	it('Should call cancel when user presses cancel from Search', () => {
		const wrapper = shallow(
			<HomeView
				{...props}
				newsList={''}
				dispatch={jest.fn}
				store={store}
			/>
		);
		const render = wrapper.dive();
		render.setProps({ newsList: JSON.stringify(allNews) });
		render.update();

		render.find('Search').forEach(child => {
			child.props().onCancel();
		});
		// console.log("render:", render.props().children[2].props.children.props.children.props);
		expect(render.props().children[2].props.children.props.children.props.onCancel()).toBeUndefined();
	});

	it('Taps filter button to navigate to source List', () => {
		const wrapper = shallow(
			<HomeView
				{...props}
				newsList={''}
				dispatch={jest.fn}
				store={store}
			/>
		);
		const render = wrapper.dive();
		render.setProps({ newsList: JSON.stringify(allNews) });
		render.update();
		render.find('ActionButton').forEach(child => {
			child.props().onPress();
		});
		expect(render.props().children[3].props.children[1].props.onPress()).toBeUndefined();

	});

	it('Taps filter button to apply filter on TopHeadlines', () => {
		const wrapper = shallow(
			<HomeView
				{...props}
				newsList={''}
				dispatch={jest.fn}
				store={store}
			/>
		);
		const render = wrapper.dive();
		render.setProps({ newsList: JSON.stringify(allNews) });
		render.update();
		render.instance().setState({ searchQuery: null });
		render.update();
		render.find('ActionButton').forEach(child => {
			child.props().onPress();
		});

		expect(render.props().children[3].props.children[1].props.onPress()).toBeUndefined();

	});

	it('Should not able to Tap filter button if more content is loading.', () => {
		const wrapper = shallow(
			<HomeView
				{...props}
				newsList={''}
				dispatch={jest.fn}
				store={store}
			/>
		);
		const render = wrapper.dive();
		render.setProps({ newsList: JSON.stringify(allNews), loading: true });
		render.update();
		render.find('ActionButton').forEach(child => {
			child.props().onPress();
		});
		console.log("loading checker ", render.props());
		expect(render.props().loading).toBe(true);
	});

	it('Taps filter button to apply filter on SearchText', () => {
		const wrapper = shallow(
			<HomeView
				{...props}
				newsList={''}
				dispatch={jest.fn}
				store={store}
			/>
		);
		const render = wrapper.dive();
		render.setProps({ newsList: JSON.stringify(allNews) });
		render.instance().setState({ searchQuery: 'India' });
		render.update();
		render.find('ActionButton').forEach(child => {
			child.props().onPress();
		});

		expect(render.props().children[3].props.children[1].props.onPress()).toBeUndefined();
	});

	it('Should do load more on list end', () => {
		const wrapper = shallow(
			<HomeView
				{...props}
				newsList={JSON.stringify(allNews)}
				dispatch={jest.fn}
				store={store}
			/>
		);
		const render = wrapper.dive();
		render.setProps({ newsList: JSON.stringify(newHeadLines) });
		render.update();
		render.props().children[3].props.children[0].props.onEndReached();

		expect(render.props().children[3].props.children[0].props.items.length).toEqual(20);

	});

	it('Should do load more on list end and should append the new data in the list when search text is blank', () => {
		const wrapper = shallow(
			<HomeView
				{...props}
				newsList={JSON.stringify(allNews)}
				dispatch={jest.fn}
				store={store}
			/>
		);
		const render = wrapper.dive();
		render.instance().setState({ currentPageIndex: 2 });
		render.update();
		render.setProps({ newsList: JSON.stringify(newHeadLines) });
		render.update();
		render.props().children[3].props.children[0].props.onEndReached();

		expect(render.props().children[3].props.children[0].props.items.length).toEqual(32);
	});

	it('Should do load more on list end and should append the new data in the list when search text is entered', () => {
		const wrapper = shallow(
			<HomeView
				{...props}
				newsList={JSON.stringify(newHeadLines)}
				dispatch={jest.fn}
				store={store}
			/>
		);
		const render = wrapper.dive();
		render.instance().setState({ currentPageIndex: 2, searchQuery: 'India' });
		render.update();
		render.setProps({ newsList: JSON.stringify(allNews) });
		render.update();
		render.props().children[3].props.children[0].props.onEndReached();
		expect(render.props().children[3].props.children[0].props.items.length).toEqual(32);
	});

	it('Should do pull to refresh fetch most recent top head lines', () => {
		const wrapper = shallow(
			<HomeView
				{...props}
				newsList={JSON.stringify(allNews)}
				dispatch={jest.fn}
				store={store}
			/>
		);
		const render = wrapper.dive();
		render.instance().setState({ currentPageIndex: 1 });
		render.update();
		render.setProps({ newsList: JSON.stringify(newHeadLines) });
		render.update();
		render.props().children[3].props.children[0].props.refreshControl.props.onRefresh()
		expect(render.props().children[3].props.children[0].props.items.length).toEqual(20);
	});

	it('Should do pull to refresh to fetch most recent searched news', () => {
		const wrapper = shallow(
			<HomeView
				{...props}
				newsList={JSON.stringify(allNews)}
				dispatch={jest.fn}
				store={store}
			/>
		);
		const render = wrapper.dive();
		render.instance().setState({ currentPageIndex: 1, searchQuery: 'India' });
		render.update();
		render.setProps({ newsList: JSON.stringify(allNews) });
		render.update();
		render.props().children[3].props.children[0].props.refreshControl.props.onRefresh()
		expect(render.props().children[3].props.children[0].props.items.length).toEqual(12);
	});
});




