import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ScrollView, Dimensions} from 'react-native';
import {color} from '../constants/Colors';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';

const TermsAndCondition = () => {
  const {width, height} = Dimensions.get('window');
  return (
    <SafeAreaView>
      <Header title="Terms and Conditions" />

      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Text
              style={{
                padding: 10,
                fontWeight: '700',
                color: 'black',
              }}>
              By using it, you are agreeing to these Terms & Conditions defined
              below. Please read them carefully. MOBILEZ MARKET doing business
              as “Mobilez Market”
            </Text>
            <Text
              style={{
                padding: 10,
                fontWeight: '400',
                color: 'black',
              }}>
              “Mobilez Market” owns and operates the website,
              www.mobilezmarket.com . The mobile touch versions, App on Play
              store, or any sites we have now or in the future that reference
              these Terms & Conditions collectively, “Mobilez Market”, provide a
              marketplace and platform for consumers and organizations to sell
              or repair their used, old and other articles, and conduct varied
              transactions and activities, with third-party companies and other
              entities and persons collectively, “Third Parties”. The Mobilez
              Market marketplace, platform, and related functionality, whether
              provided through the Site or other means, are collectively
              referred to as the services the “Services”.
            </Text>
            <Text
              style={{
                padding: 10,
                fontWeight: '400',
                color: 'black',
              }}>
              If you do not agree with any part of these Terms & Conditions, you
              must not use the Site or Services. Your continued use of the Site
              or Services will constitute your acceptance of these Terms &
              Conditions, as they may be modified by us from time to time, with
              or without notice to you. Please check this page regularly for
              updates to the Mobilez Market Terms & Conditions.
            </Text>

            <View>
              <Text style={styles.heading}>
                1. Mobilezmarket.com is a marketplace venue.
              </Text>
              <Text style={styles.bulletPoint}>
                Mobilezmarket.com is a platform to allow users, subject to
                compliance with Mobilez Market’s policies, to sell/repair
                certain goods. Mobilez Market may not be directly involved in
                the transaction between the users and third-party professionals,
                ensuring no control by reasons whatsoever in any aspect of your
                transactions with Third Parties, and the Third Parties are
                solely responsible to you for all aspects of your transactions
                with them.
              </Text>
              <Text style={styles.heading}>
                2. Permitted Use and Compliance with Laws.
              </Text>
              <Text style={styles.bulletPoint}>
                Mobilez Market authorizes you to access, view and use the Site
                content and software (collectively, the "Mobilez Market Pvt Ltd
                Property") solely to the extent necessary for you to use the
                Services. You may not remove any copyright, trademark, or other
                proprietary notices that have been placed on the Mobilez Market
                Property. You may not engage in systematic retrieval of data or
                other content from the Mobilez Market Property. Except as
                expressly permitted by these Terms & Conditions, any
                modification, reproduction, redistribution, republication,
                uploading, posting, transmitting, distributing, or otherwise
                exploiting in any way the Mobilez Market Property, or any
                portion of the Mobilez Market Property, is strictly prohibited
                without the prior written permission of Mobilez Market Pvt Ltd.
              </Text>
              <Text style={styles.heading}>
                3. You agree that you will comply with all applicable laws,
                regulations, and ordinances relating to the Site and Services,
                the Mobilez Market Property, or your use of them and that in
                using the Site and Services you will not engage in any conduct
                that restricts or inhibits any other person from using or
                enjoying the Services.
              </Text>
              <Text style={styles.heading}>
                4. Mobilez Market Services and Third-Party Services and Sites
              </Text>
              <Text style={styles.bulletPoint}>
                The information and materials provided on the Site and through
                the Services are intended for general reference only, and may
                not describe all of the terms, conditions, and exceptions
                applicable to Mobilez Market’s Services. Mobilez Market presents
                information from Third Parties through the Mobilez Market Site
                and Services, including prices offered for your items, item
                descriptions, certain Third Party terms of service, and other
                information "Third Party Information". Mobilez Market cannot
                control and is not responsible for the accuracy of any Third
                Party Information.
              </Text>
              <Text style={styles.bulletPoint}>
                You conduct your actual sales and other transactions directly
                with the Third Parties and, unless otherwise specifically
                indicated, not with Mobilez Market. Mobilez Market cannot
                control any aspect of your sales and transactions with Third
                Parties, and the Third Parties are solely responsible to you for
                all aspects of your sales and transactions with them.
              </Text>
              <Text style={styles.bulletPoint}>
                At times, the Mobilez Market Site may have links to websites
                hosted by the Third Parties and other entities the "Additional
                Sites", or such Additional Sites may have links to the Mobilez
                Market Site. These links are offered as a convenience and for
                informational purposes only, not as referrals or endorsements by
                Mobilez Market of the Additional Sites.
              </Text>

              <Text style={styles.heading}>5. Privacy and Passwords</Text>
              <Text style={styles.bulletPoint}>
                Mobilez Market values and protects the privacy of your
                information. Please review the Mobilez Market privacy policy, as
                it contains important information relating to your use of the
                Site and Services. Some portions of the Site are protected and
                require a user identification code (“User ID”) and password for
                access. Unauthorized access or use of such portions of the Site
                is prohibited. You agree that you will notify Mobilez Market
                immediately if you believe that a third party has obtained your
                User ID or password, or if you believe that any unauthorized
                access or use may occur or has occurred. For your protection, if
                Mobilez Market believes that any unauthorized access may occur
                or has occurred, Mobilez Market may terminate access without
                prior notice to you. You also agree that Mobilez Market is
                permitted to act upon any instructions received such
                instructions as authorized by you.
              </Text>
              <Text style={styles.heading}>6. Membership</Text>
              <Text style={styles.bulletPoint}>
                Inactive Status: A Member’s Account may be set to inactive if
                there is no activity associated with that Account for 180 days.
              </Text>
              <Text style={styles.bulletPoint}>
                You understand that agreeing to run diagnostics on the Mobilez
                Market app program will allow Mobilez Market access to your
                device, solely concerning conducting the assessment of the
                quality parameters of your device. In no matter will your
                private information and data on the device will be accessed for
                any other purpose and such information shall not be downloaded
                by the Company or used in any other manner.
              </Text>
              <Text style={styles.bulletPoint}>Grievance Officer</Text>
              <Text style={styles.bulletPoint}>
                Under Information Technology Act 2000 and the rules made there
                under, the name and contact details of the Grievance Officer are
                provided below:
              </Text>

              <Text style={styles.bulletPoint}>Mr. Danish Memon</Text>

              <Text style={styles.bulletPoint}>Mobilez Market Pvt. Ltd.</Text>
              <Text style={styles.bulletPoint}>
                Golf course Road 4, Phase 4, Dha, Karachi
              </Text>
              <Text style={styles.bulletPoint}>
                Contact Us: info@mobilezmarket.com
              </Text>
              <Text style={styles.email}>info@mobilezmarket.com</Text>
              <Text style={styles.bulletPoint}>
                Time: Monday to Friday 10:00 AM – 6:30 PM
              </Text>
              <Text style={styles.bulletPoint}></Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({
  bulletPoint: {
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 13,
    color: 'black',
    fontWeight: '400',
  },
  heading: {
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 13,
    color: 'black',
    fontWeight: '600',
  },
  textHeading: {
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  email: {
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 13,

    fontWeight: '400',
    color: color.blue,
  },
});
