import React, {useState} from "react";
import 'whatwg-fetch';
import { 
  Card,
  CardTitle,
  CardBody,
  PageSection,
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Title } from '@patternfly/react-core';

import { KYCContext } from '@app/KYCContext';

interface IKYCMonitoringState {
  count: number,
  elapsedTime: number
}

class KYCMonitoring extends React.Component<{},IKYCMonitoringState> {
  static contextType = KYCContext;
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      elapsedTime: 0
    };
  }

  componentDidMount() {

    fetch(this.context.metricsUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(
      (result) => {
        if(result.ok){
          result.json().then((body) => {
            this.setState({
              count:body['http.server.requests']['count;method=POST;outcome=SUCCESS;status=200;uri=/KYC'],
              elapsedTime:body['http.server.requests']['elapsedTime;method=POST;outcome=SUCCESS;status=200;uri=/KYC']
            });
          });
        } else {
        }
      },
      (error) => {
      }
    );
  }

  render() {
    return (
      <>
        <DescriptionList columnModifier={{ lg: '2Col' }}>
          <DescriptionListGroup>
            <DescriptionListTerm># KYC call</DescriptionListTerm>
            <DescriptionListDescription>{this.state.count}</DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Response time</DescriptionListTerm>
            <DescriptionListDescription>{this.state.elapsedTime} ms</DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
      </>
    );
  }
}

const Monitoring: React.FunctionComponent = () => (
  <PageSection>
    <Card>
      <CardTitle>
        <Title headingLevel="h1" size="lg">KYC Monitoring</Title>
      </CardTitle>
      <CardBody>
        <KYCMonitoring/>
      </CardBody>
    </Card>
  </PageSection>
)

export { Monitoring };
