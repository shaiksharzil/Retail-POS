package com.retail.backend.account.dto;

public class AccountRequest {

    private String companyName;

    private String businessType;

    private String gstNumber;

    private String phone;

    private String email;

    private String website;

    private String addressLine1;

    private String addressLine2;

    private String city;

    private String state;

    private String pincode;

    private String country;

    private String footerMessage;

    private String termsAndConditions;

    public String getCompanyName() {
        return companyName;
    }

    public String getBusinessType() {
        return businessType;
    }

    public String getGstNumber() {
        return gstNumber;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getWebsite() {
        return website;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getPincode() {
        return pincode;
    }

    public String getCountry() {
        return country;
    }

    public String getFooterMessage() {
        return footerMessage;
    }

    public String getTermsAndConditions() {
        return termsAndConditions;
    }
}