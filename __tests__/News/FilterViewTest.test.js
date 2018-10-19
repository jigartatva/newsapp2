import React from 'react';
import FilterView from '../../src/containers/screens/filter/FilterView'
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../src/redux/store';


configure({ adapter: new Adapter() });

describe('FILTER VIEW ', () => {
  jest.mock('WebView');
  const props = {
    navigation: {
      setParams: jest.fn(),
      getParam: jest.fn(),
      navigate: jest.fn()
    },
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
 

  it('should render "Filter View"', () => {
    const wrapper = shallow(
      <FilterView {...props} dispatch={jest.fn} store={store} />
    );
 expect(wrapper.containsMatchingElement(<legend>FilterView</legend>));
  });

  it('should render "Filter View" with Sources', () => {
    const wrapper = shallow(
      <FilterView
        {...props}
        newsSources={JSON.stringify(items)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ newsSources: JSON.stringify(items) });
    render.update();
    // console.log("render: ", render.props().children[1].props.items.length);
    expect(render.props().children[1].props.items.length).toEqual(7);
  });



  it('should select sources', () => {
    const tree = shallow(
      <FilterView
        {...props}
        newsSources={''}
        store={store}
        dispatch={jest.fn}
      />
    );
    const render = tree.dive();
    render.setProps({ newsSources: JSON.stringify(items) });
    render.update();
    render.setState({ selectedItems: JSON.stringify(items) });
    render.update();
    render.find('SelectMultiple').forEach(child => {
      child.props().onSelectionsChange();
    });
 console.log("render:",render.props().children[1].props.onSelectionsChange);
 expect( render.props().children[1].props.onSelectionsChange()).toBeUndefined();
  });

  it('should apply filter', () => {
    const tree = shallow(
      <FilterView
        {...props}
        newsSources={''}
        store={store}
        dispatch={jest.fn}
      />
    );
    const render = tree.dive();
    render.setState({ selectedItems: JSON.stringify(items) });
    render.update();
    render.setProps({ newsSources: JSON.stringify(items) });
    render.update();
    render.find('TouchableOpacity').forEach(child => {
      child.props().onPress();
    });
    
     expect( render.props().children[2].props.onPress()).toBeUndefined();
  });

 
});