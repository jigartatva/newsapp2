import React from 'react';
import HomeView from '../../src/containers/screens/home/HomeView';
import store from '../../src/redux/store';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('HOME VIEW ', () => {
  jest.mock('WebView');
  const props = {
    navigation: {
      setParam: jest.fn(),
      getParam:jest.fn(),
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
      },{
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
        },{
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
  const items = [
    {
      "id": "abc-news",
      "name": "ABC News",
      "description": "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
      "url": "https://abcnews.go.com",
      "category": "general",
      "language": "en",
      "country": "us"
    },
    {
      "id": "abc-news-au",
      "name": "ABC News (AU)",
      "description": "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
      "url": "http://www.abc.net.au/news",
      "category": "general",
      "language": "en",
      "country": "au"
    },
    {
      "id": "aftenposten",
      "name": "Aftenposten",
      "description": "Norges ledende nettavis med alltid oppdaterte nyheter innenfor innenriks, utenriks, sport og kultur.",
      "url": "https://www.aftenposten.no",
      "category": "general",
      "language": "no",
      "country": "no"
    },
    {
      "id": "al-jazeera-english",
      "name": "Al Jazeera English",
      "description": "News, analysis from the Middle East and worldwide, multimedia and interactives, opinions, documentaries, podcasts, long reads and broadcast schedule.",
      "url": "http://www.aljazeera.com",
      "category": "general",
      "language": "en",
      "country": "us"
    },
    {
      "id": "ansa",
      "name": "ANSA.it",
      "description": "Agenzia ANSA: ultime notizie, foto, video e approfondimenti su: cronaca, politica, economia, regioni, mondo, sport, calcio, cultura e tecnologia.",
      "url": "http://www.ansa.it",
      "category": "general",
      "language": "it",
      "country": "it"
    },
    {
      "id": "argaam",
      "name": "Argaam",
      "description": "ارقام موقع متخصص في متابعة سوق الأسهم السعودي تداول - تاسي - مع تغطيه معمقة لشركات واسعار ومنتجات البتروكيماويات , تقارير مالية الاكتتابات الجديده ",
      "url": "http://www.argaam.com",
      "category": "business",
      "language": "ar",
      "country": "sa"
    },
    {
      "id": "ars-technica",
      "name": "Ars Technica",
      "description": "The PC enthusiast's resource. Power users and the tools they love, without computing religion.",
      "url": "http://arstechnica.com",
      "category": "technology",
      "language": "en",
      "country": "us"
    }]

  it('calls seach as expected when enter the words to search', () => {
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
      child.props().onSearch('abc-news, argaam');
    });
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
  render.setProps({ newsList: allNews, newsSources: items });
  render.update();
  render.find('ActionButton').forEach(child => {
    
    child.props().onPress();
  });
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
  render.setProps({ newsList: allNews, newsSources: items });
  render.update();
  render.setState({ searchQuery: null });
  render.update();
  render.find('ActionButton').forEach(child => {
    child.props().onPress();
  });
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
  render.setProps({ newsList: allNews, newsSources: items });
  render.update();
  render.setState({ searchQuery: 'India' });
  render.update();
  render.find('ActionButton').forEach(child => {
    child.props().onPress();
  });
});

it('On Load More', () => {
  const wrapper = shallow(
    <HomeView
        {...props}
        newsList={''}
        dispatch={jest.fn}
        store={store}
      />
  );
  const render = wrapper.dive();
  render.setProps({ newsList: allNews, newsSources: items });
  render.update();
  render.setState({ currentPageIndex: 1 });
  render.update();
  render.find('GridView').forEach(child => {
    console.log("child:",child.props());
    child.props().onEndReached();
  });
});


});




