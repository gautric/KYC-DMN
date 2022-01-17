/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.kie.kogito.dmn.quarkus.example.listener;

import javax.enterprise.context.ApplicationScoped;

import org.kie.dmn.api.core.DMNContext;
import org.kie.dmn.api.core.DMNMessage.Severity;
import org.kie.dmn.api.core.DMNModel;
import org.kie.dmn.api.core.event.AfterEvaluateAllEvent;
import org.kie.dmn.api.core.event.AfterEvaluateBKMEvent;
import org.kie.dmn.api.core.event.AfterEvaluateContextEntryEvent;
import org.kie.dmn.api.core.event.AfterEvaluateDecisionEvent;
import org.kie.dmn.api.core.event.AfterEvaluateDecisionServiceEvent;
import org.kie.dmn.api.core.event.AfterEvaluateDecisionTableEvent;
import org.kie.dmn.api.core.event.AfterInvokeBKMEvent;
import org.kie.dmn.api.core.event.BeforeEvaluateAllEvent;
import org.kie.dmn.api.core.event.BeforeEvaluateBKMEvent;
import org.kie.dmn.api.core.event.BeforeEvaluateContextEntryEvent;
import org.kie.dmn.api.core.event.BeforeEvaluateDecisionEvent;
import org.kie.dmn.api.core.event.BeforeEvaluateDecisionServiceEvent;
import org.kie.dmn.api.core.event.BeforeEvaluateDecisionTableEvent;
import org.kie.dmn.api.core.event.BeforeInvokeBKMEvent;
import org.kie.dmn.api.core.event.DMNEvent;
import org.kie.dmn.api.core.event.DMNRuntimeEventListener;
import org.kie.dmn.core.impl.DMNContextImpl;
import org.kie.dmn.core.impl.DMNMessageImpl;
import org.kie.dmn.core.impl.DMNResultImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ApplicationScoped
public class DMNListener implements DMNRuntimeEventListener {

	private static final Logger LOG = LoggerFactory.getLogger(DMNRuntimeEventListener.class);

	public void beforeEvaluateDecision(BeforeEvaluateDecisionEvent event) {

		log("beforeEvaluateDecision", event);
	}

	public void afterEvaluateDecision(AfterEvaluateDecisionEvent event) {

		log("afterEvaluateDecision", event);
	}

	public void beforeEvaluateBKM(BeforeEvaluateBKMEvent event) {

		log("beforeEvaluateBKM", event);
	}

	public void afterEvaluateBKM(AfterEvaluateBKMEvent event) {

		log("afterEvaluateBKM", event);
	}

	public void beforeEvaluateContextEntry(BeforeEvaluateContextEntryEvent event) {

		log("beforeEvaluateContextEntry", event);
	}

	public void afterEvaluateContextEntry(AfterEvaluateContextEntryEvent event) {

		log("afterEvaluateContextEntry", event);
	}

	public void beforeEvaluateDecisionTable(BeforeEvaluateDecisionTableEvent event) {

		log("beforeEvaluateDecisionTable", event);
	}

	public void afterEvaluateDecisionTable(AfterEvaluateDecisionTableEvent event) {

		log("afterEvaluateDecisionTable", event);
	}

	public void beforeEvaluateDecisionService(BeforeEvaluateDecisionServiceEvent event) {

		log("beforeEvaluateDecisionService", event);
	}

	public void afterEvaluateDecisionService(AfterEvaluateDecisionServiceEvent event) {

		log("afterEvaluateDecisionService", event);
	}

	public void beforeInvokeBKM(BeforeInvokeBKMEvent event) {

		log("beforeInvokeBKM", event);
	}

	public void afterInvokeBKM(AfterInvokeBKMEvent event) {

		log("afterInvokeBKM", event);
	}

	public void beforeEvaluateAll(BeforeEvaluateAllEvent event) {

		log("beforeEvaluateAll", event);
	}

	public void afterEvaluateAll(AfterEvaluateAllEvent event) {

		log("afterEvaluateAll", event);

		DMNResultImpl result = ((DMNResultImpl) event.getResult());

		DMNModel model = result.getModel();
		DMNContext context = result.getContext();

		event.getResult().getMessages()
				.add(new DMNMessageImpl(Severity.INFO, "ID : " + model.getDefinitions().getId(), null, null));
		event.getResult().getMessages()
				.add(new DMNMessageImpl(Severity.INFO, "Name : " + model.getDefinitions().getName(), null, null));
		event.getResult().getMessages()
				.add(new DMNMessageImpl(Severity.INFO, "NS : " + model.getDefinitions().getNamespace(), null, null));
		event.getResult().getMessages()
				.add(new DMNMessageImpl(Severity.INFO, "Description : " + model.getDefinitions().getDescription(), null, null));

	}

	private void log(String type, DMNEvent event) {
		LOG.error("{} received by {}    {} ", type, event);
	}

}
