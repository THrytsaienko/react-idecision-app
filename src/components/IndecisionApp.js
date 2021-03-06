import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
        // this.setState (() => {
        // 	return {
        // 		options: []
        // 	};
        // });
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }
    handleClearSelectedOption = () => {
        this.setState(() => ({
            selectedOption: undefined
        }));
    }
    handlePick = () => {
        let randomNumber = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNumber];
        this.setState(() => ({ selectedOption: option }));
    }
    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
        // this.setState((prevState) => {
        // 	return {
        // 		options: prevState.options.concat([option])
        // 	};
        // });
    }

    // before using plugin "transform-class-properties"
    // constructor(props) {
    //     super(props);
    //     this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    //     this.handlePick = this.handlePick.bind(this);
    //     this.handleAddOption = this.handleAddOption.bind(this);
    //     this.handleDeleteOption = this.handleDeleteOption.bind(this);
    //     this.state = {
    //         options: [] // changed because IndecisionApp.defaultProps for options array were added
    //         // options: props.options
    //     };
    // }
    
    // handleDeleteOptions() {
    //     this.setState(() => ({ options: [] }));
    //     // this.setState (() => {
    //     // 	return {
    //     // 		options: []
    //     // 	};
    //     // });
    // }
    // handleDeleteOption(optionToRemove) {
    //     this.setState((prevState) => ({
    //         options: prevState.options.filter((option) => optionToRemove !== option)
    //     }));
    // }
    // handlePick() {
    //     let randomNumber = Math.floor(Math.random() * this.state.options.length);
    //     const item = this.state.options[randomNumber];
    //     alert(item);
    // }
    // handleAddOption(option) {
    //     if (!option) {
    //         return 'Enter valid value to add item';
    //     } else if (this.state.options.indexOf(option) > -1) {
    //         return 'This option already exists';
    //     }

    //     this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
    //     // this.setState((prevState) => {
    //     // 	return {
    //     // 		options: prevState.options.concat([option])
    //     // 	};
    //     // });
    // }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            // Do nothing at all
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    render() {
        // const title = 'Indecision'; // delete because Header.defaultProps were added
        const subtitle = 'Put your life in the hands of a copmuter';

        return (
            <div>
                { /* <Header title={title} subtitle={subtitle}/> // delete because Header.defaultProps were added */}
				<Header subtitle={subtitle} />
				<div className="container">
					<Action
						hasOptions={this.state.options.length > 0}
						handlePick={this.handlePick}
					/>
					<div className="widget">
						<Options
							options={this.state.options}
							handleDeleteOptions={this.handleDeleteOptions}
							handleDeleteOption={this.handleDeleteOption}
						/>
						<AddOption
							handleAddOption={this.handleAddOption}
						/>
					</div>
					<OptionModal
						selectedOption={this.state.selectedOption}
						handleClearSelectedOption={this.handleClearSelectedOption}
					/>
				</div>
            </div>
        );
    }
}

// IndecisionApp.defaultProps = {
// 	options: []
// }