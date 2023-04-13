import React, {useContext} from "react";
import 'whatwg-fetch';
import { Card,
  CardTitle,
  CardBody,
  FormGroup,
  TextInput,
  FormSelect,
  FormSelectOption,
  HelperText,
  HelperTextItem,
  Switch,
  PageSection,
  Alert,
  AlertGroup,
  AlertActionCloseButton,
  AlertVariant,
  DataList,
  DataListItem,
  DataListItemRow,
  DataListItemCells,
  DataListCell,
  Title } from '@patternfly/react-core';

import { Context } from '@app/Context/Context';

interface IKYCAlert {
  key: number, 
  variant: string, 
  title: string
}

interface IKYCState {
  kyc: {
    PEP: boolean,
    Amount: number,
    "Fiscal Residency": string
  },
  result: {
    KYC: {
      Level: number,
      Score: string
    }
  },
  isResult: boolean,
  alerts: Array<IKYCAlert>
}

class KYCDynamic extends React.Component<{},IKYCState> {
  static contextType = Context;

  constructor(props) {
    super(props);   
    // Store state into session
    this.state = JSON.parse(window.sessionStorage.getItem('state')) || {
      kyc : {
        PEP: false,
        Amount: 1000,
        "Fiscal Residency": 'FR'
      },
      result: {
        KYC: {
          Level: 0, 
          Score: "LOW"
        }
      },
      isResult: false,
      alerts: []
    };
  }
  
  options = [
    { value: 'please choose', label: 'Please Choose', disabled: true },
    { value: 'FR', label: 'France', disabled: false },
    { value: 'JP', label: 'Japan', disabled: false },
    { value: 'CY', label: 'Chyprus', disabled: false },
    { value: 'RU', label: 'Russia', disabled: false },
    { value: 'KP', label: 'North Korea', disabled: false }
  ];

  getUniqueId = () => (new Date().getTime());

  handleSubmit() {
    fetch(this.context.apiUrl + "/KYC", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.kyc)
    })
    .then(
      (result) => {
        if(result.ok){
          result.json().then((body) => {
              this.setState({
                result: body,
                isResult : true
              });
              window.sessionStorage.setItem('state', JSON.stringify(this.state));
            });
          } else {
            this.addAlert('Call Error : ' + result.status + ' ' + result.statusText , 'danger', this.getUniqueId());
          }
      },
      (error) => {
        this.addAlert('Network Error : ' + error, 'danger', this.getUniqueId());
      }
    );
  }

  convertLevel = (level, name) => {
    let ret = AlertVariant.default;
      if(level && level[name]){
        switch (level[name]) {
          case "LOW":
            ret = AlertVariant.success;
            break;
          case "MEDIUM":
            ret = AlertVariant.warning;
            break;
          case "HIGH":
          case "VERY HIGH":
            ret = AlertVariant.danger;
            break;
        }
      }
    return ret;
  }

  addAlert = (title, variant, key) => {
    this.setState({
      alerts: [ ...this.state.alerts, { title: title, variant: variant, key }]
    });
    setTimeout(() => this.removeAlert(key), 5000); // Remove alert after 5s
  };

  removeAlert = key => {
    this.setState({ alerts: [...this.state.alerts.filter(el => el.key !== key)] });
  };

  handlePep = (checked, event) => {
    this.setState((state, props) => ({kyc : {...this.state.kyc, PEP : !this.state.kyc.PEP}}), () => (this.handleSubmit()));
  };

  handleAmount = (amount, event) => {
      this.setState((state, props) => ({kyc : {...this.state.kyc, Amount : parseInt(amount.replace(/\D/g,'') || 0)}}), () => (this.handleSubmit()));
  };

  handleFiscalResidency = (fiscalResidency, event) => {
    this.setState((state, props) => ({kyc : {...this.state.kyc, "Fiscal Residency" : fiscalResidency}}), () => (this.handleSubmit()));
  };

  render() {
    return (
      <>
        <AlertGroup isToast>
          {this.state.alerts.map(({key, variant, title}) => (
            <Alert
              isLiveRegion
              variant={AlertVariant[variant]}
              title={title}
              actionClose={
                <AlertActionCloseButton
                  title={title}
                  variantLabel={`${variant} alert`}
                  onClose={() => this.removeAlert(key)}
                />
              }
              key={key} />
          ))}
        </AlertGroup>

        <DataList aria-label="Simple data list example">
          <DataListItem aria-labelledby="header">
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="Criteria">Criteria</DataListCell>,
                  <DataListCell key="Value">Value</DataListCell>,
                  <DataListCell key="Score" hidden={!this.state.isResult}>Score</DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem>
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="PEPLabel" >
                    <FormGroup
                      label="Political Exposed Person"
                      fieldId="pep-param"/>
                  </DataListCell>,
                  <DataListCell key="PEPform" > 
                    <Switch id="pep-param"
                      label="Political Exposed Person"
                      labelOff="Anonymous Person"
                      isChecked={this.state.kyc["PEP"]}
                      onChange={this.handlePep}
                      />
                  </DataListCell>,
                  <DataListCell key="PEPResult" hidden={!this.state.isResult}>
                      <Alert variant={this.convertLevel(this.state.result,"PEP Rule")}  title={this.state.result["PEP Rule"]} />
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem>
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="AmountLabel" >
                    <FormGroup
                      label="Amount"
                      isRequired
                      fieldId="amount-param"/>
                  </DataListCell>,
                  <DataListCell key="AmountForm">
                    <TextInput
                      isRequired
                      type="text"
                      id="amount-param"
                      name="amount"
                      aria-describedby="amount"
                      value={this.state.kyc["Amount"]}
                      onChange={this.handleAmount}
                    />
                  </DataListCell>,
                  <DataListCell key="AmountValue"  hidden={!this.state.isResult}>
                      <Alert variant={this.convertLevel(this.state.result,"Amount Rule")}  title={this.state.result["Amount Rule"]} />
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem>
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="FRLabel">
                    <FormGroup
                      label="Fiscal Residency"
                      isRequired
                      fieldId="fiscalResidency-param"
                      />
                  </DataListCell>,
                  <DataListCell key="FRForm">
                    <FormSelect id="fiscalResidency-param" value={this.state.kyc["Fiscal Residency"]} onChange={this.handleFiscalResidency} aria-label="FormSelect Input">
                      {this.options.map((option, index) => (
                        <FormSelectOption isDisabled={option.disabled} key={option.value.toString()} value={option.value} label={option.label} />
                      ))}
                    </FormSelect>
                  </DataListCell>,
                  <DataListCell key="FRValue" hidden={!this.state.isResult}>
                      <Alert variant={this.convertLevel(this.state.result,"Fiscal Residency Rule")}  title={this.state.result["Fiscal Residency Rule"]} />
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem>
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="TotalLabel" alignRight>
                    <b>Total</b>
                  </DataListCell>,
                  <DataListCell key="TotalForm"/>,
                  <DataListCell key="TotalValue" hidden={!this.state.isResult}>
                      <Alert variant={this.convertLevel(this.state.result.KYC,"Level")} isInline title={ this.state.result.KYC.Level + " " +  this.state.result.KYC.Score} />
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
        </DataList>
      </>
    );
  }
}

const Dynamic: React.FunctionComponent = () => {

  const context = useContext(Context)

  return (
    <PageSection>
      <Card>
        <CardTitle>
          <Title headingLevel="h1" size="lg">KYC</Title>
          <HelperText>
            <HelperTextItem variant="indeterminate">Endpoint : {context.apiUrl}</HelperTextItem>
          </HelperText>
        </CardTitle>
        <CardBody>
          <KYCDynamic/>
        </CardBody>
      </Card>
    </PageSection>
  )
}

export { Dynamic };
