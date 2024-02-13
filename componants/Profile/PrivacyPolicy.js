import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {create} from 'react-test-renderer';

const PrivacyPolicy = () => {
  return (
    <ScrollView>
      <View style={{Width: '90%'}}>
        <View
          style={{
            flex: 1,
            paddingTop: 10,
            paddingHorizontal: 16,
            backgroundColor: '#1F51C6',
            alignItems: 'center',
            padding: 15,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>
            Privacy Policy
          </Text>
        </View>
        <View>
          <Text style={styles.text}>
            Medidek is owned and managed by Medidek Healthcare pvt ltd herein
            after referred to as Medidek If you continue to browse and use this
            website you are agreeing to comply with and be bound by the
            following terms and conditions of use, which together with our
            privacy policy govern Medidek relationship with you in relation to
            this website.
          </Text>
          <Text style={styles.text}>
            The term Medidek or 'us' or 'we' refers to the owner of the website
            whose registered office is in Nagpur, Maharashtra. Our company
            registration number is U74909MH2023PTC405996 India. The term 'you'
            refers to the user or viewer of our website.
          </Text>

          <Text style={styles.heading}>
            The use of this website is subject to the following terms of use:
          </Text>
          <Text style={styles.text}>
            The content of the pages of this website is for your general
            information and use only. It is subject to change without notice.
          </Text>
          <Text style={styles.text}>
            Neither we nor any third parties provide any warranty or guarantee
            as to the accuracy, timeliness, performance, completeness or
            suitability of the information and materials found or offered on
            this website for any particular purpose. You acknowledge that such
            information and materials may contain inaccuracies or errors and we
            expressly exclude liability for any such inaccuracies or errors to
            the fullest extent permitted by law.
          </Text>
          <Text style={styles.text}>
            Your use of any information or materials on this website is entirely
            at your own risk, for which we shall not be liable. It shall be your
            own responsibility to ensure that any products, services or
            information available through this website meet your specific
            requirements.
          </Text>
          <Text style={styles.text}>
            This website contains material which is owned by or licensed to us.
            This material includes, but is not limited to, the design, layout,
            look, appearance and graphics. Reproduction is prohibited other than
            in accordance with the copyright notice, which forms part of these
            terms and conditions. All trademarks reproduced in this website
            which are not the property of, or licensed to Medidek  are
            acknowledged on the website.
          </Text>
          <Text style={styles.text}>
            Unauthorised use of this website may give rise to a claim for
            damages and/or be a criminal offence. From time to time this website
            may also include links to other websites. These links are provided
            for your convenience to provide further information. They do not
            signify that we endorse the website(s). We have no responsibility
            for the content of the linked website(s).
          </Text>
          <Text style={styles.text}>
            You may not create a link to this website from another website or
            document without Medidek  prior written consent. Your use of this
            website and any dispute arising out of such use of the website is
            subject to the laws of India or regulatory authority within the
            country of India.
          </Text>

          <Text style={styles.heading}>Cancellation Policy</Text>
          <Text>
            Medidek believes in helping its customers as far as possible, and
            has therefore a liberal cancellation policy. Under this policy:
          </Text>
          <Text style={styles.text}>
            Cancellations will be considered only if the request is made within
            24 hours of placing an order. However, the cancellation request will
            not be entertained if the orders have been communicated to the
            operational team and Operations team has initiated the process of
            assignment. Cancellation and refund of fees or charges will be
            strictly governed by the Company Refund Policy of the company
            informed and declared from time to time.
          </Text>
          <Text style={styles.text}>
            There is no cancellation of orders placed under the Same day
            delivery category.
          </Text>
          <Text style={styles.text}>
            No cancellations are entertained for those products/services that
            the Medidek marketing team has obtained on special discounts and
            offers on occasions like New Year, Pongal, Diwali, Independence Day,
            Foundation Day etc. These are limited occasion offers and therefore
            cancellations are not possible.
          </Text>

          <Text style={styles.heading}>Refund Policy</Text>
          <Text style={styles.text}>
            When you buy our products/services, your purchase is covered by our
            24 hours money back guarantee. If you are, for any reason, not
            entirely happy with your purchase, we will cheerfully issue a full
            refund, subject to deductions for legal documents or services
            provided. To request a refund under this guarantee, you must contact
            us within the first 24 hours of your payment. Just send an email
            to Medidek . We'll gladly refund you 100% of your fees within 24-72
            hours of your refund request.
          </Text>

          <Text style={styles.heading}>Privacy Policy</Text>
          <Text style={styles.text}>
            This privacy policy sets out how Medidek  uses and protects any
            information that you provide to Medidek  when you use this website.
            Medidek  is committed to ensuring that your privacy is protected.
            Should we ask you to provide certain information by which you can be
            identified when using this website, then you can be assured that it
            will only be used in accordance with this privacy statement. Medidek
             may change this policy from time to time by updating this page. You
            should check this page from time to time to ensure that you are
            happy with any changes. This policy is revised and effective from
            01/01/2016. What we collect: We may collect the following
            information Name and Job title Contact Information including email
            address & phone number Demographic Information such as City,
            postcode, preferences and interests Other Information relevant to
            service enquiry, customer surveys and/or offers What we do with the
            information we gather We require this information to understand your
            needs and provide you with a best service, and in particular for the
            following reasons: Internal record keeping. We may use the
            information to improve our products and services. We may
            periodically send promotional emails about new products, special
            offers or other information which we think you may find interesting
            using the email address which you have provided. From time to time,
            we may also use your information to contact you for feedback, market
            research purposes. We may contact you by email, phone, fax or mail.
            We may use the information to customise the website according to
            your interests.
          </Text>

          <Text style={styles.heading}>Security</Text>
          <Text style={styles.text}>
            We are committed to ensuring that your information is secure. In
            order to prevent unauthorised access or disclosure we have put in
            place suitable physical, electronic and managerial procedures to
            safeguard and secure the information we collect online.
          </Text>

          <Text style={styles.heading}>How we use cookies</Text>
          <Text style={styles.text}>
            A cookie is a small file which asks permission to be placed on your
            computer's hard drive. Once you agree, the file is added and the
            cookie helps analyse web traffic or lets you know when you visit a
            particular site. Cookies allow web applications to respond to you as
            an individual. The web application can tailor its operations to your
            needs, likes and dislikes by gathering and remembering information
            about your preferences. We use traffic log cookies to identify which
            pages are being used. This helps us analyse data about webpage
            traffic and improve our website in order to tailor it to customer
            needs. We only use this information for statistical analysis
            purposes and then the data is removed from the system. Overall,
            cookies help us provide you with a better website, by enabling us to
            monitor which pages you find useful and which you do not. A cookie
            in no way gives us access to your computer or any information about
            you, other than the data you choose to share with us. You can choose
            to accept or decline cookies. Most web browsers automatically accept
            cookies, but you can usually modify your browser setting to decline
            cookies if you prefer. This may prevent you from taking full
            advantage of the website.
          </Text>

          <Text style={styles.heading}>Links to other websites</Text>
          <Text style={styles.text}>
            Our website may contain links to other websites of interest.
            However, once you have used these links to leave our site, you
            should note that we do not have any control over that other website.
            Therefore, we cannot be responsible for the protection and privacy
            of any information which you provide whilst visiting such sites and
            such sites are not governed by this privacy statement. You should
            exercise caution and look at the privacy statement applicable to the
            website in question.
          </Text>

          <Text style={styles.heading}>
            Controlling your Personal Information
          </Text>
          <Text style={styles.text}>
            You may choose to restrict the collection or use of your personal
            information in the following ways: whenever you are asked to fill in
            a form on the website, look for the box that you can click to
            indicate that you do not want the information to be used by anybody
            for promotional purposes. If such box is not available, you may
            choose not to fill such form. However, by submitting the filled
            enquiry form, you will be construed to have foregone your right and
            Company may choose to send promotional emails and materials from
            time to time. if you have previously agreed to us using your
            personal information for promotional purposes, you may change your
            mind at any time by writing to or emailing us at contact@medidek.in
            We will not sell, distribute or lease your personal information to
            third parties unless we have your permission or are required by law
            to do so. We may use your personal information to send you
            promotional information about third parties which we think you may
            find interesting.
          </Text>

          <Text style={styles.heading}>Contacting Us</Text>
          <Text style={styles.text}>
            If there are any questions regarding this privacy policy you may
            contact us using the information below: Medidek Healthcare pvt ltd
            contact@medidek.in Tel.: +91 7721840990
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    color: '#1F51C6',
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 5,
  },
  text:{
    color:"black",
    fontWeight:'600',
    fontSize:13,
  }
});