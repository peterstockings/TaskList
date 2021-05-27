import React from "react";
import 'bulma/css/bulma.min.css';
import {Card, Media, Heading, Content} from 'react-bulma-components'
import "./TaskCard.scss";
import API from '../../services/API.service'

export default function TaskCard(props) {

  const {_id, name, description, completed, deadline} = props.task

  const toggleCompleteHandler = () => API.toggle(_id, completed).catch(err => console.log('Error: ',err))

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
  