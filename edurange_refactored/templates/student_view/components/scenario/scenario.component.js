// import sample_content from "../../../../../../edurange-flask/scenarios/prod/getting_started/student_view/content.json";
import React from 'react';
import ReactDOM from 'react-dom';

import GuideSection from "../guide-section/guide-section.component";
import TopicList from "../topic-list/topic-list.component";
import Chatbox from "../chatbox/chatbox.component";
import "./scenario.styles.css";

class StudentScenario extends React.Component {
    // get content for this scenario
  constructor(props) {
    super(props);
    this.state = { 
        seenSection: 0,
        currentSection: 0,
        content: {},
        scenarioState: {},
        csrf_token:document.getElementById("csrf_token").getAttribute("content"),
    }
  }

  componentDidMount() {
    fetch(`/api/get_content/${this.props.scenarioId}`)
      .then((resp) => resp.json())
      .then((json) => this.setState({content: json}));

    fetch(`/api/get_state/${this.props.scenarioId}`)
      .then((resp) => resp.json())
      .then((json) => this.setState({scenarioState: json}));
  }

  componentWillUnmount() {
  }

  // clickTopic(id) {

  //   this.setState({currentSection: id});
  // }
  // componentDidMount() {
  //   this.setState({
  //     content: this.fetchContent(this.props.scenario_id)
  //   }) 
  // }

  // fetchContent(scenario_id) {
  //   return sample_content;
  // }

  // TODO handle error code cases
  // fetchContent(scenario_id) {
  //   var s = fetch(`/api/get_content_test/${scenario_id}`).then((resp) => this.setState({content:resp.json()}));
  //   return s;
  // }

  // fetchState() {
  //   return fetch(`/api/get_state/${this.props.scenarioId}`).then((resp) => resp.body.json())
  // }

  putAns(scenario_id, answer) {
    return null
    //TODO
  }

    render() {
      if (Object.keys(this.state.content).length > 0) {
        const { Sections, Readings, Questions } = this.state.content.StudentGuide;
        // console.log(this.state.content.StudentGuide);
        // return (
        //   <div className="student_view">
        //     <h1>Student Guide</h1>
        //   </div>
        // );
        console.log(Sections[this.state.currentSection]);
        return (
       <div className="student_view">
        <TopicList currentSection={this.state.currentSection} sections={Sections} setState={p => {this.setState(p)}}/>
        <GuideSection section={Sections[this.state.currentSection]} readings={Readings} questions={Questions} scenarioState={this.state.scenarioState} scenarioId={this.props.scenarioId} csrf_token={this.state.csrf_token} />
        <Chatbox className='chatbox' />
      </div>           
        );
      } else {
        return <div className="student_view"></div>
      }
    }
}

var e = document.getElementById('student_scenario');
ReactDOM.render(<StudentScenario scenarioId={e.attributes.scenario_id.value} />, e);
// const container = document.getElementById('student_scenario');
// const root = createRoot(container);
// root.Render(
//   <StudentScenario/>
// );