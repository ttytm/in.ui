/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

export const GroupSectionProperties = {
  company_details: [
    'name',
    'id_number',
    'vat_number',
    'website',
    'email',
    'phone',
    'qr_iban',
    'besr_id',
    'size_id',
    'industry_id',
    'custom_value1',
    'custom_value2',
    'custom_value3',
    'custom_value4',
    'address1',
    'address2',
    'city',
    'state',
    'postal_code',
    'country_id',
    'payment_type_id',
    'valid_until',
    'default_expense_payment_type_id',
    'use_quote_terms_on_conversion',
    'invoice_terms',
    'invoice_footer',
    'quote_terms',
    'quote_footer',
    'credit_terms',
    'credit_footer',
    'purchase_order_terms',
    'purchase_order_footer',
    'company_logo',
  ],
  localization: [
    'currency_id',
    'use_comma_as_decimal_place',
    'show_currency_code',
    'language_id',
    'timezone_id',
    'date_format_id',
    'military_time',
    'first_month_of_year',
  ],
  payment_settings: [
    'auto_bill_standard_invoices',
    'auto_bill',
    'auto_bill_date',
    'use_credits_payment',
    'payment_terms',
    'enable_applying_payments',
    'client_portal_allow_over_payment',
    'client_portal_allow_under_payment',
    'client_portal_under_payment_minimum',
    'client_initiated_payments',
    'client_initiated_payments_minimum',
    'client_manual_payment_notification',
    'client_online_payment_notification',
    'mark_paid_payment_email',
    'company_gateway_ids',
  ],
  tax_settings: [
    'enabled_tax_rates',
    'enabled_item_tax_rates',
    'enabled_expense_tax_rates',
    'inclusive_taxes',
    'tax_name1',
    'tax_rate1',
    'tax_name2',
    'tax_rate2',
    'tax_name3',
    'tax_rate3',
  ],
  task_settings: [
    'enabled_tax_rates',
    'enabled_item_tax_rates',
    'enabled_expense_tax_rates',
    'inclusive_taxes',
    'default_task_rate',
    'enable_client_portal_tasks',
    'show_all_tasks_client_portal',
  ],
  workflow_settings: [
    'auto_email_invoice',
    'stop_on_unpaid_recurring',
    'auto_archive_invoice',
    'auto_archive_invoice_cancelled',
    'lock_invoices',
    'auto_convert_quote',
    'auto_archive_quote',
  ],
  invoice_design: [
    'invoice_design_id',
    'quote_design_id',
    'credit_design_id',
    'purchase_order_design_id',
    'page_layout',
    'page_size',
    'font_size',
    'company_logo_size',
    'primary_font',
    'secondary_font',
    'primary_color',
    'secondary_color',
    'show_paid_stamp',
    'show_shipping_address',
    'hide_empty_columns_on_pdf',
    'page_numbering',
    'page_numbering_alignment',
  ],
  generated_numbers: [
    'counter_padding',
    'counter_number_applied',
    'recurring_number_prefix',
    'shared_invoice_quote_counter',
    'shared_invoice_credit_counter',
    'reset_counter_frequency_id',
    'reset_counter_date',
    'client_number_pattern',
    'client_number_counter',
    'invoice_number_pattern',
    'invoice_number_counter',
    'recurring_invoice_number_pattern',
    'recurring_invoice_number_counter',
    'payment_number_pattern',
    'payment_number_counter',
    'quote_number_pattern',
    'quote_number_counter',
    'credit_number_pattern',
    'credit_number_counter',
    'project_number_pattern',
    'project_number_counter',
    'task_number_pattern',
    'task_number_counter',
    'vendor_number_pattern',
    'vendor_number_counter',
    'purchase_order_number_pattern',
    'purchase_order_number_counter',
    'expense_number_pattern',
    'expense_number_counter',
    'recurring_expense_number_pattern',
    'recurring_expense_number_counter',
  ],
  client_portal: [
    'portal_domain',
    'enable_client_portal',
    'client_portal_enable_uploads',
    'vendor_portal_enable_uploads',
    'accept_client_input_quote_approval',
    'client_portal_terms',
    'client_portal_privacy_policy',
    'enable_client_portal_password',
    'show_accept_invoice_terms',
    'show_accept_quote_terms',
    'require_invoice_signature',
    'require_quote_signature',
    'require_purchase_order_signature',
    'signature_on_pdf',
    'client_can_register',
    'client_registration_fields',
    'custom_message_dashboard',
    'custom_message_unpaid_invoice',
    'custom_message_paid_invoice',
    'custom_message_unapproved_quote',
    'portal_custom_head',
    'portal_custom_footer',
    'portal_custom_css',
    'portal_custom_js',
  ],
  email_settings: [
    'show_email_footer',
    'pdf_email_attachment',
    'document_email_attachment',
    'ubl_email_attachment',
    'email_sending_method',
    'postmark_secret',
    'mailgun_secret',
    'mailgun_domain',
    'mailgun_endpoint',
    'email_from_name',
    'reply_to_name',
    'reply_to_email',
    'bcc_email',
    'entity_send_time',
    'email_style',
    'email_style_custom',
    'email_signature',
    'enable_e_invoice',
  ],
  templates_and_reminders: [
    'endless_reminder_frequency_id',
    'enable_reminder_endless',
    'late_fee_percent1',
    'late_fee_percent2',
    'late_fee_percent3',
    'late_fee_amount1',
    'late_fee_amount2',
    'late_fee_amount3',
    'enable_reminder1',
    'enable_reminder2',
    'enable_reminder3',
    'schedule_reminder1',
    'schedule_reminder2',
    'schedule_reminder3',
    'num_days_reminder1',
    'num_days_reminder2',
    'num_days_reminder3',
  ],
};
