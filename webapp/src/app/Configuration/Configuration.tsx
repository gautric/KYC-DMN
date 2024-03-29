//import * as React from 'react';
import React, { ReactElement } from "react";
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
  render():ReactElement {
    return (
      <ContextConsumer>
        {({ apiUrl, updateApiUrl }) => (
          <TextInput value={apiUrl} type="url" onChange={(v) => (updateApiUrl(v))} aria-label="text input example" />
        )}
      </ContextConsumer>
    );
  }
}

class Configuration extends React.Component {
  render():ReactElement {
    return (
      <PageSection>
        <Card>
          <CardTitle>
            <Title headingLevel="h1" size="lg">Configuration</Title>
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
}

export { Configuration };
