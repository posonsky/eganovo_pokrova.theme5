# -*- coding: utf-8 -*-
from plone.app.contenttypes.testing import PLONE_APP_CONTENTTYPES_FIXTURE
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import applyProfile
from plone.app.testing import FunctionalTesting
from plone.app.testing import IntegrationTesting
from plone.app.testing import PloneSandboxLayer
from plone.testing import z2

import eganovo_pokrova.theme5


class EganovoPokrovaTheme5Layer(PloneSandboxLayer):

    defaultBases = (PLONE_APP_CONTENTTYPES_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        self.loadZCML(package=eganovo_pokrova.theme5)

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'eganovo_pokrova.theme5:default')


EGANOVO_POKROVA_THEME5_FIXTURE = EganovoPokrovaTheme5Layer()


EGANOVO_POKROVA_THEME5_INTEGRATION_TESTING = IntegrationTesting(
    bases=(EGANOVO_POKROVA_THEME5_FIXTURE,),
    name='EganovoPokrovaTheme5Layer:IntegrationTesting'
)


EGANOVO_POKROVA_THEME5_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(EGANOVO_POKROVA_THEME5_FIXTURE,),
    name='EganovoPokrovaTheme5Layer:FunctionalTesting'
)


EGANOVO_POKROVA_THEME5_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        EGANOVO_POKROVA_THEME5_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE
    ),
    name='EganovoPokrovaTheme5Layer:AcceptanceTesting'
)
