import sample_content from './sample_content.json';
import GuideSection from './guide_section.component'
import TopicList from './topic-list.component'
import Chatbox from './chatbox.component'

class StudentScenario extends React.Component {
    // get content for this scenario
  constructor(props) {
    super(props);
    this.state = { 
        seenSection: 0,
        content: sample_content
    }
  }

  // componentDidMount() {
  //   this.setState({
  //     content: this.fetchContent(this.props.scenario_id)
  //   }) 
  // }

  fetchContent(scenario_id) {
    return sample_content
  }

  // TODO handle error code cases
  fetchContentTODO(scenario_id) {
    return fetch(`/api/get_content/${scenario_id}`).then((resp) => resp.body.json())
  }

  fetchState(scenario_id) {
    return fetch(`/api/get_state/${scenario_id}`).then((resp) => resp.body.json())
  }

  putAns(scenario_id, answer) {
    return null
    //TODO
  }

    render() {
        //const { Sections, Readings, Questions } = this.state.content.StudentGuide;
        console.log(this.state.content.StudentGuide);
        return (
          <div className="student_view">
            <h1>Student Guide</h1>
          </div>
        );
        return (
       <div className="student_view">
        <TopicList sections={Sections}/>
        <GuideSection section={Sections[this.state.seenSection]} readings={Readings} questions={Questions} />
        {/* {Sections.map((sec) => {
            return (
                <GuideSection section={sec} readings={Readings} questions={Questions} />
            );
        }
        )} */}
         <h1 className='scenario_name'>{sample_content.ScenarioTitle}</h1>
         <Chatbox className='chatbox' />
      </div>           
        );
    }
}

ReactDOM.render(<StudentScenario />, document.getElementById('student_view_scenario'))