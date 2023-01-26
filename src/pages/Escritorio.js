import React, { useContext, useState } from 'react'
import { Row, Col, Typography, Button, Divider } from 'antd'
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { useHideMenu } from './../hooks/useHideMenu';
import { getUserStorage } from './../helpers/getUserStorage';
import { Navigate, useNavigate } from 'react-router-dom';
import { SocketContext } from './../context/SocketContext';

const { Title, Text } = Typography;

export const Escritorio = () => {

  useHideMenu(false);

  const { socket }  = useContext( SocketContext );

  const [ usuario ] = useState( getUserStorage() );

  const [ ticket, setTicket ] = useState(null)

  const history = useNavigate();

  const Salir = () => {
    localStorage.clear()
    history('/ingresar');
  }

  const NextTicket = () => {
    socket.emit('siguiente-ticket-trabajar', usuario, ( ticket ) => {
      setTicket( ticket )
    })
  }

  if ( !usuario.agente || !usuario.escritorio ) {
    return <Navigate to="/ingresar" />
  }

  return (
    <>
        <Row>
            <Col span={ 20 }>
              <Title lavel={ 2 }>{ usuario.agente }</Title>
              <Text>Está atendiendo el paciente con turno número: </Text>
              <Text type='success'>{ usuario.escritorio }</Text>
            </Col>

            <Col span={ 4 } align="right">
              <Button
                shape='round'
                type='danger'
                onClick={ Salir }
              >
                <CloseCircleOutlined/>
                Salir
              </Button>

            </Col>
        </Row>

        <Divider/>

        {
            ticket && (
              <Row>
                  <Col>
                    <Text>Está atendiendo el paciente con turno número: </Text>
                    <Text style={{ fontSize:30 }} type='danger' > { ticket.numero } </Text>
                  </Col>
              </Row>
            )

        }

        <Row>
          <Col offset={ 10 } span={ 6 } align='right'>
              <Button onClick={ NextTicket } shape='round' type='primary'>
                  Siguiente Paciente
                  <RightOutlined/>
              </Button>
          </Col>
        </Row>


    </>
  )
}
