package com.retail.backend.account.service;

import com.retail.backend.account.dto.AccountRequest;
import com.retail.backend.account.entity.BusinessAccount;
import com.retail.backend.account.repository.BusinessAccountRepository;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final BusinessAccountRepository repository;

    public AccountService(
            BusinessAccountRepository repository
    ) {
        this.repository = repository;
    }

    public BusinessAccount save(
            AccountRequest request
    ) {

        BusinessAccount account =
                repository
                        .findAll()
                        .stream()
                        .findFirst()
                        .orElse(
                                new BusinessAccount()
                        );

        account.setCompanyName(
                request.getCompanyName()
        );

        account.setBusinessType(
                request.getBusinessType()
        );

        account.setGstNumber(
                request.getGstNumber()
        );

        account.setPhone(
                request.getPhone()
        );

        account.setEmail(
                request.getEmail()
        );

        account.setWebsite(
                request.getWebsite()
        );

        account.setAddressLine1(
                request.getAddressLine1()
        );

        account.setAddressLine2(
                request.getAddressLine2()
        );

        account.setCity(
                request.getCity()
        );

        account.setState(
                request.getState()
        );

        account.setPincode(
                request.getPincode()
        );

        account.setCountry(
                request.getCountry()
        );

        account.setFooterMessage(
                request.getFooterMessage()
        );

        account.setTermsAndConditions(
                request.getTermsAndConditions()
        );

        return repository.save(account);
    }
    public BusinessAccount getAccount() {

        return repository
                .findAll()
                .stream()
                .findFirst()
                .orElse(null);

    }
}