import React, {useState} from "react";
import 'whatwg-fetch';
import { 
  Card,
  CardTitle,
  CardBody,
  PageSection,
  DataList,
  DataListItem,
  DataListItemRow,
  DataListItemCells,
  DataListCell,
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

    fetch(this.context.apiUrl + "/q/metrics", {
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
        }
      }
    );
  }

  render() {
    return (
      <>        
        <DataList aria-label="Simple data list example">
          <DataListItem aria-labelledby="header">
            <DataListItemRow>
              <DataListItemCells 
                dataListCells={[
                  <DataListCell># KYC call</DataListCell>,
                  <DataListCell>{this.state.count}</DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="header">
            <DataListItemRow>
              <DataListItemCells 
                dataListCells={[
                  <DataListCell>Response time</DataListCell>,
                  <DataListCell>{this.state.elapsedTime} ms </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
        </DataList>
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
