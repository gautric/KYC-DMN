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

import { useContextStore } from '@app/Context';

const Config: React.FunctionComponent = () => {

  const {apiURL, updateAPIURL} = useContextStore();

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
                      <DataListCell key="URL Value"><TextInput value={apiURL} type="url" onChange={updateAPIURL} aria-label="text input example" /> </DataListCell>
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

export { Config };
