import React, {useState} from 'react';
import {Input, Form, Tabs, Button, Checkbox, DatePicker} from 'antd';
import 'antd/dist/antd.css';
import './App.css';

const {TabPane} = Tabs;

const createInput = (name) => (onChange, enabled) => (<Form.Item label="Basic input" labelCol={{ span: 24 }} key={name}>
	<Input placeholder="Type something" onChange={onChange.bind(this, name)} disabled={!enabled}/>
</Form.Item>);

const createTextArea = (name) => (onChange, enabled) => (<Form.Item label="Basic textarea" labelCol={{ span: 24 }} key={name}>
	<Input.TextArea placeholder="Type something" onChange={onChange.bind(this, name)} disabled={!enabled}/>
</Form.Item>);

const createDatepicker = (name) => (onChange, enabled) => (<Form.Item label="Basic textarea" labelCol={{ span: 24 }} key={name}>
	<DatePicker onChange={onChange.bind(this, name)} disabled={!enabled}/>
</Form.Item>);

function App() {
	const [components, addComponent] = useState([]);
	const [values, changeValue] = useState({});
	const [isEnabled, setEnabled] = useState(false);
	
	function onChange (name, { target }, date) {
		const obj = {};
		obj[name] = target && target.value || date;
		changeValue({...values, ...obj});
	}

	function addInput () {
		const name = `input-${components.length}`;
		addComponent(components => [...components, createInput(name)]);
	}
	
	function addTextarea () {
		const name = `textarea-${components.length}`;
		addComponent(components => [...components, createTextArea(name)]);
	}
	
	function addDatepicker () {
		const name = `datepicker-${components.length}`;
		addComponent(components => [...components, createDatepicker(name)]);
	}
	
	function onEditChange ({ target : { checked } }) {
		setEnabled(checked);
		console.log(components);
	}

	return (
		<div className="main">
			<Tabs defaultActiveKey="1">
				<TabPane tab="Form Settings" key="Form Settings">
					<div className="controls-wrapper">
					<Checkbox onChange={onEditChange} checked={isEnabled}>
						Edit
					</Checkbox>
					<Button type="primary" onClick={addInput}>
						Add input
					</Button>
					<Button type="primary" onClick={addTextarea}>
						Add textarea
					</Button>
					<Button type="primary" onClick={addDatepicker}>
						Add datepicker
					</Button>
					</div>
					{components.map(component => component(onChange, isEnabled))}
				</TabPane>
				<TabPane tab="Result" key="Result">
					<ul>
						{Object.keys(values).map(key => <li key={key}> {key}: {values[key]}</li>)}
					</ul>
				</TabPane>
			</Tabs>
		</div>
	);
}

export default App;
