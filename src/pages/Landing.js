import React from 'react';
import styled from 'styled-components';
// import { connect } from 'react-redux';
import ScheduleModal from '../components/ScheduleModal';

const Container = styled.div`
    height: 100%; 
    width: 100%; 
    display: flex; 
    justify-content: center;
`

const Background = styled.div`
    position: absolute; 
    top: 0; 
    right: 0 
    bottom: 0; 
    left: 0; 
    background: linear-gradient(90deg, white 50%, #f3f3f3 50%);
    z-index: -1;
`

const TextBlock = styled.div`
    padding: 1.4rem;
    flex: 0 1 400px;
`

class Landing extends React.Component {
    render() {
        return (
            <Container>
                <Background />
                <TextBlock>
                    <h2>
                        h2 summary
                    </h2>
                    <p>
                        Description about emotive, maybe?
                    </p>
                    <p>
                        The signup modal can be called from anywhere in the app 
                    </p>
                </TextBlock>
                <ScheduleModal />
                <TextBlock>
                    <h2>
                        h2 summary
                    </h2>
                    <p>
                        Summary of how data is collected...
                    </p>
                </TextBlock>
            </Container>
        )
    }
}
// export default connect(null, null)(Landing)
export default Landing
