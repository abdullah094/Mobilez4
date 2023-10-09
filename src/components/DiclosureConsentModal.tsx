import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';

const DisclosureConsentModal = ({visible, onDismiss, onConsent}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../assets/mobile-logo.png')}
              style={styles.logo}
            />
            <View style={styles.scrollViewContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}>
                <Text style={styles.title}>Consent Agreement</Text>
                <Text style={styles.description}>
                  Before you continue, please read and accept our consent
                  statement:
                </Text>
                <Text style={styles.description}>
                  By clicking
                  <Text style={{fontWeight: '700'}}> "I Agree" </Text> you
                  consent to the collection and use of certain information, as
                  outlined below:
                </Text>

                <Text style={styles.listItem}>
                  1. We may collect and process your personal information for
                  the purpose of providing our services, including CNIC, name,
                  email, and address.
                </Text>

                <Text style={styles.listItem}>
                  2. Your data will be handled in accordance with our privacy
                  policy, which you can review on our website and app.
                </Text>
              </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={onConsent}
                mode="contained"
                style={styles.actionButton}>
                I Agree
              </Button>
              <Button
                onPress={onDismiss}
                mode="contained"
                style={styles.actionButton}>
                Deny
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
    marginVertical: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center', // Center the description text
  },
  listItem: {
    fontSize: 16,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    borderRadius: 10,
    backgroundColor: '#015dcf',
    width: '45%',
    margin: 5,
  },
  scrollViewContainer: {
    maxHeight: 300, // Adjust the maximum height as needed
  },
  scrollView: {
    flex: 1,
  },
});

export default DisclosureConsentModal;
