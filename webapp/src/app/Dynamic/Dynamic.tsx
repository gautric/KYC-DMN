import * as React from 'react';
import 'whatwg-fetch';
import { Form,
  Card, 
  CardTitle, 
  CardBody,
  FormGroup,
  TextInput,
  FormSelect,
  FormSelectOption,
  Switch,
  ActionGroup,
  Button,
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
  Title} from '@patternfly/react-core';

const KYC_DMN_URL = process.env.KYC_DMN_URL;

interface IKYCState {
  url: string,
  pep: boolean,
  amount: number,
  fiscalResidency: string,
  result: object,
  isResult: boolean,
  alerts: Array<object>
};

class KYCForm extends React.Component<{},IKYCState> {

  constructor(props) {
    super(props);
    this.state = {
      url: KYC_DMN_URL,
      pep: false,
      amount: 10000,
      fiscalResidency: 'FR',
      result: {"KYC" : {"Level":0, "Score":"LOW"}},
      isResult: false,
      alerts: []
    };
     
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  options = [
    { value: 'please choose', label: 'Please Choose', disabled: true },
    { value: 'FR', label: 'France', disabled: false },
    { value: 'JP', label: 'Japan', disabled: false },
    { value: 'CY', label: 'Chyprus', disabled: false },
    { value: 'RU', label: 'Russia', disabled: false },
    { value: 'KP', label: 'North Korea', disabled: false }
  ];

  handleUrl = url => {
    this.setState({ url });
  };

  getUniqueId = () => (new Date().getTime());

  handleSubmit(event) {

    fetch(this.state.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "PEP": this.state.pep,
        "Amount": this.state.amount,
        "Fiscal Residency": this.state.fiscalResidency
      })
    })
    .then(
      (result) => {
        if(result.ok){
          result.json().then((body) => { 
              this.setState({
                result: body
              });
            });
          } else {
            this.addAlert('Call Error : ' + result.status + ' ' + result.statusText , 'danger', this.getUniqueId());
          }
      },
      (error) => {
        this.addAlert('Network Error : ' + error, 'danger', this.getUniqueId());
      }
    );
    this.setState({isResult : true});
    event.preventDefault();
  }

  convertLevel = (level, name) => {
    var ret = AlertVariant.default;
    if(level){
      if(level[name]){
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
    }
    return ret;
  }

  addAlert = (title, variant, key) => {
    this.setState({
      alerts: [ ...this.state.alerts, { title: title, variant: variant, key }]
    });
  };

  removeAlert = key => {
    this.setState({ alerts: [...this.state.alerts.filter(el => el.key !== key)] });
  };

  handlePep = (checked, event) => {
    this.setState({ ["pep"] : event.target.checked });
//    this.handleSubmit("event");
  };

  handleAmount = (amount, event) => {
      this.setState({amount : parseInt(amount.replace(/\D/g,''))});
//      this.handleSubmit("event");
  };

  handleFiscalResidency = (fiscalResidency, event) => {
    this.setState({ fiscalResidency });
//    this.handleSubmit("event");
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} isHorizontal >
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
        <FormGroup
          label="URL of DMN Engine"
          isRequired
          fieldId="url-param">
          <TextInput
            isRequired
            type="text"
            id="url-param"
            name="url-param"
            aria-describedby="url-param-helper"
            value={this.state.url}
            onChange={this.handleUrl}
          />
        </FormGroup>

        <DataList aria-label="Simple data list example">
          <DataListItem aria-labelledby="header">
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="primary content">Criteria</DataListCell>,
                  <DataListCell key="primary content">Value</DataListCell>,
                  <DataListCell key="secondary content" hidden={!this.state.isResult}>Score</DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="simple-item2">
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell  key="secondary content fill">
                    <FormGroup
                      label="Political Exposed Person"
                      fieldId="pep-param"/>
                  </DataListCell>,
                  <DataListCell  key="secondary content fill">
                    <Switch id="pep-param" 
                      label="Political Exposed Person"
                      labelOff="Anonymous Person"
                      isChecked={this.state.pep}
                      onChange={this.handlePep}
                      /> 
                  </DataListCell>,
                  <DataListCell   key="secondary content align" hidden={!this.state.isResult}>
                      <Alert variant={this.convertLevel(this.state.result,"PEP Rule")}  title={this.state.result["PEP Rule"]} /> 
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="simple-item2">
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell  key="secondary content fill">
                    <FormGroup
                      label="Amount"
                      isRequired
                      fieldId="amount-param"/>
                  </DataListCell>,
                  <DataListCell  key="secondary content fill">
                    <TextInput
                      isRequired
                      type="text"
                      id="amount-param"
                      name="amount"
                      aria-describedby="amount"
                      value={this.state.amount}
                      onChange={this.handleAmount}
                    />
                  </DataListCell>,
                  <DataListCell   key="secondary content align" hidden={!this.state.isResult}>
                      <Alert variant={this.convertLevel(this.state.result,"Amount Rule")}  title={this.state.result["Amount Rule"]} /> 
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="simple-item2">
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell  key="secondary content fill">
                    <FormGroup
                      label="Fiscal Residency"
                      isRequired
                      fieldId="fiscalResidency-param"                      
                      />
                  </DataListCell>,
                  <DataListCell  key="secondary content fill">
                    <FormSelect id="fiscalResidency-param" value={this.state.fiscalResidency} onChange={this.handleFiscalResidency} aria-label="FormSelect Input">
                      {this.options.map((option, index) => (
                        <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
                      ))}
                    </FormSelect>
                  </DataListCell>,
                  <DataListCell   key="secondary content align" hidden={!this.state.isResult}>
                      <Alert variant={this.convertLevel(this.state.result,"Fiscal Residency Rule")}  title={this.state.result["Fiscal Residency Rule"]} /> 
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="simple-item2">
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell alignRight key="secondary content fill">
                    Total Score KYC
                  </DataListCell>,
                  <DataListCell />,
                  <DataListCell   key="secondary content align" hidden={!this.state.isResult}>
                      <Alert variant={this.convertLevel(this.state.result.KYC,"Level")} isInline title={ this.state.result.KYC.Level + " " +  this.state.result.KYC.Score} />
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
        </DataList>

        <ActionGroup>
          <Button variant="primary" type="submit">Envoyer</Button>
        </ActionGroup>

      </Form>
    );
  }
}

const Dynamic: React.FunctionComponent = () => (
  <PageSection>
    <Card>
      <CardTitle>  
        <Title headingLevel="h1" size="lg">KYC Formular</Title>
      </CardTitle>
      <CardBody> 
        <KYCForm/>
      </CardBody>
    </Card>
  </PageSection>
)

export { Dynamic };
