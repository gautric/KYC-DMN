//import * as React from 'react';
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
import PlusCircleIcon from '@patternfly/react-icons/dist/js/icons/plus-circle-icon';
import parsePrometheusTextFormat from 'parse-prometheus-text-format';
import {JSONPath} from 'jsonpath-plus';

const KYC_DMN_URL = process.env.KYC_DMN_URL;

interface IKYCMonitoringState {
  result: object
};

class KYCMonitoring extends React.Component<{},IKYCMonitoringState> {

  constructor(props) {
    super(props);
    this.state = {
      result: {},
    };

    this.fetchData();
  }

  fetchData() {

    fetch("/api/metrics", {
      method: 'GET',
      headers: {
        'Accept': '*/*'
      }
    })
    .then(
      (result) => {
        if(result.ok){
          result.text().then((body) => {
          let json = parsePrometheusTextFormat(body);
            this.setState({
              result:json
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

  //const result2 = JSONPath({path: "$..[?(@.name=='api_http_response_code')].metrics[?(@.labels.endpoint=='KYC-full')][value]", json:this.state.result})[0];
  //const result2 = JSONPath({path: "$..[?(@.name=='api_execution_elapsed_nanosecond')].metrics.[0].quantiles.[0.99]", json:this.state.result})[0]/1000000;

    return (
      <>
        <DescriptionList columnModifier={{ lg: '2Col' }}>
          <DescriptionListGroup  >
            <DescriptionListTerm># KYC call</DescriptionListTerm>
            <DescriptionListDescription>{parseFloat(JSONPath({path: "$..[?(@.name=='api_http_response_code')].metrics[?(@.labels.endpoint=='KYC')][value]", json:this.state.result})[0])}</DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Response time (&lt; 3')</DescriptionListTerm>
            <DescriptionListDescription>{JSONPath({path: "$..[?(@.name=='api_execution_elapsed_nanosecond')].metrics.[0].quantiles.[0.99]", json:this.state.result})[0]/1000000} ms</DescriptionListDescription>
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
