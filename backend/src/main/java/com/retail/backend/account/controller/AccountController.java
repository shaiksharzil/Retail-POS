package com.retail.backend.account.controller;

import com.retail.backend.account.dto.AccountRequest;
import com.retail.backend.account.entity.BusinessAccount;
import com.retail.backend.account.service.AccountService;
import org.springframework.web.bind.annotation.*;
import com.retail.backend.account.entity.BusinessAccount;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(
            AccountService accountService
    ) {
        this.accountService =
                accountService;
    }

    @GetMapping
    public BusinessAccount getAccount() {

        return accountService.getAccount();

    }

    @PostMapping
    public BusinessAccount save(
            @RequestBody
            AccountRequest request
    ) {

        return accountService.save(
                request
        );
    }
}