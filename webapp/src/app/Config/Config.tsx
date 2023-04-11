//import * as React from 'react';
import React from "react";
import 'whatwg-fetch';
import { Card,
  CardTitle,
  CardBody,
  TextInput,
  PageSection,
  DataList,
  DataListItem,
  DataListItemRow,
  DataListItemCells,
  DataListCell,
  Title } from '@patternfly/react-core';

import { ContextConsumer } from "@app/Context/Context";

class InputAPIURL extends React.Component {
  render() {
    return (
      <ContextConsumer>
        {({ apiUrl, updateApiUrl }) => (
          <TextInput value={apiUrl} type="url" onChange={(v,e) => (updateApiUrl(v))} aria-label="text input example" />
        )}
      </ContextConsumer>
    );
  }
}

class Config extends React.Component {
  render() {
    return (
      <PageSection>
        <Card>
          <CardTitle>
            <Title headingLevel="h1" size="lg">KYC Config</Title>
          </CardTitle>
          <CardBody>
            <>
              <DataList aria-label="Simple data list example">
                <DataListItem aria-labelledby="header">
                  <DataListItemRow>
                    <DataListItemCells 
                      dataListCells={[
                        <DataListCell key="URL Field">URL</DataListCell>,
                        <DataListCell key="URL Value"><InputAPIURL /> </DataListCell>
                      ]}
                    />
                  </DataListItemRow>
                </DataListItem>
              </DataList>
            </>
          </CardBody>
        </Card>
      </PageSection>
    )
  }
};

export { Config };
