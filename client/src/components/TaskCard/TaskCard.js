import React from "react";
import 'bulma/css/bulma.min.css';
import {Card, Media, Heading, Content} from 'react-bulma-components'
import "./TaskCard.scss";
import {API_URL, COMPLETE_TASK, OPEN_TASK} from '../../constants/API.constants'

export default function TaskCard(props) {

  const {_id, name, description, completed, deadline} = props.task

  const toggleCompleteHandler = () => {
    let endpoint = completed ? `${OPEN_TASK}${_id}` : `${COMPLETE_TASK}${_id}`

    fetch(endpoint, {method: 'PUT'})
      .catch(err => console.log('Error: ',err))
  }

  return (
    <Card className="card">
      <Card.Content>
        <Media>
          <Media.Item>
            <Heading size={4} onClick={toggleCompleteHandler}>
              <>
                <input type="checkbox" id={_id} name="completed" checked={completed} readOnly/>
                <label htmlFor="completed" data-content={name}>{name}</label>
              </>
            </Heading>
            <Heading subtitle size={6}>
              {description}
            </Heading>
          </Media.Item>
        </Media>
        <Content>
          <time>{deadline}</time>
        </Content>
      </Card.Content>
    </Card>
  );
}
  