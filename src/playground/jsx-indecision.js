console.log('App.js is running!');

// JSX - JavaScript XML

const app = {
    title: 'Indecision App',
    subtitle: 'Put your life in computer\'s hand',
    options: []
};

const onFormSubmit = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value;

    if (option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        render();
    }
};

const onRemoveAll = () => {
    app.options = [];
    render();
};

const onMakeDecision = () => {
    const randomNumber = Math.floor(Math.random() * app.options.length);
    const item = app.options[randomNumber];
};

const decision = (randomNumber) => {
    app.options.map((item, index) => {
        if (index === randomNumber) {
            return item;
            console.log(item);
        }
    })
};

const appRoot = document.getElementById('app');

const render = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {(app.subtitle && app.subtitle.length) && <p>{app.subtitle}</p>}
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
                {
                    app.options.map((item, index) => <li key={index}>{item}</li>)
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
            {
                // app.options.map((item, index) => {
                // 	if(index === randomNumber){
                // 		<p key={index}>{item}</p>
                // 	}
                // })
            }
        </div>
    );

    ReactDOM.render(template, appRoot);
}

render();