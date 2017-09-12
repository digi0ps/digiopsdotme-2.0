import React from 'react';

class Input extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: "",
      hud: helper.default
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.setInput = this.setInput.bind(this);
  }

  setInput(e){
    this.setState({input: e.target.value});
  }

  updateHUD(string){
    this.setState({hud: string});
  }

  handleCommand(args){
    switch(args[0]){

      case "/login":
        const l = args.length;
        if(l<3)
          this.updateHUD("Make sure you enter both username and pass bro");
        else if(l>3)
          this.updateHUD("Are you sure you wrote only username and pass?");
        else{
          this.updateHUD(helper.authenticating);
          const result = this.props.auth(args[1], args[2]);
          result
            .then((string) => this.updateHUD(string))
            .catch((err) => this.updateHUD("It's wrong mate."))
        }
        break;

      case "/logout":
        this.props.logout();
        this.updateHUD(helper.default);
        break;

      default:
        this.updateHUD(helper.wrong);
    }
  }

  handleKeyPress(event){
    // if(event.target.value.length>5){
    //   this.setState({hud:""})
    // }
    if(event.key === "Enter"){
      let input = this.state.input;
      input = input.trim();
      if(input[0] === '/'){
        input = input.split(" ");
        this.handleCommand(input);
      } 
      else {
        this.props.send(input);
      }

      this.setState({
        input: ""
      });
    }
  }

  render(){
    return(
      <div className="chat-input-div">
        <div><i>{this.state.hud}</i></div>
        <label>${this.props.username}: </label>
        <input type="text" 
          id="chat-input"
          className="chat-input" 
          placeholder={helper.placeholder}
          onChange={this.setInput}
          onFocus={this.props.setTitle}
          onKeyPress={this.handleKeyPress} 
          value={this.state.input}/>
      </div>
    );
  }
}

const helper = {
  placeholder: "Type on me, thy highness.",
  default: "Aye welcome to the awesome chat terminal",
  authenticating: "Waiting for our elite ravens to authenticate you.",

  wrong: "Wrong command mate, do ya need /help?",
}
export default Input;
