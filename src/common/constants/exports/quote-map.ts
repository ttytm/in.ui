/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

interface Record {
    trans: string;
    value: string;
}

export const quoteMap: Record[] = [
{ trans: 'quote_number', value: "quote.number" },
{ trans: 'amount', value: "quote.amount" },
{ trans: 'balance', value: "quote.balance" },
{ trans: 'paid_to_date', value: "quote.paid_to_date" },
{ trans: 'discount', value: "invoice.discount" },
{ trans: 'po_number', value: "quote.po_number" },
{ trans: 'date', value: "quote.date" },
{ trans: 'due_date', value: "quote.due_date" },
{ trans: 'terms', value: "quote.terms" },
{ trans: 'footer', value: "quote.footer" },
{ trans: 'status', value: "quote.status" },
{ trans: 'public_notes', value: "quote.public_notes" },
{ trans: 'private_notes', value: "quote.private_notes" },
{ trans: 'uses_inclusive_taxes', value: "quote.uses_inclusive_taxes" },
{ trans: 'is_amount_discount', value: "quote.is_amount_discount" },
{ trans: 'partial', value: "quote.partial" },
{ trans: 'partial_due_date', value: "quote.partial_due_date" },
{ trans: 'custom_value1', value: "quote.custom_value1" },
{ trans: 'custom_value2', value: "quote.custom_value2" },
{ trans: 'custom_value3', value: "quote.custom_value3" },
{ trans: 'custom_value4', value: "quote.custom_value4" },
{ trans: 'surcharge1', value: "quote.custom_surcharge1" },
{ trans: 'surcharge2', value: "quote.custom_surcharge2" },
{ trans: 'surcharge3', value: "quote.custom_surcharge3" },
{ trans: 'surcharge4', value: "quote.custom_surcharge4" },
{ trans: 'exchange_rate', value: "quote.exchange_rate" },
{ trans: 'tax_amount', value: "quote.tax_amount" },    
{ trans: 'quantity', value: "item.quantity" },
{ trans: 'discount', value: "item.discount" },
{ trans: 'cost', value: "item.cost" },
{ trans: 'product_key', value: "item.product_key" },
{ trans: 'notes', value: "item.notes" },
{ trans: 'custom_value1', value: "item.custom_value1" },
{ trans: 'custom_value2', value: "item.custom_value2" },
{ trans: 'custom_value3', value: "item.custom_value3" },
{ trans: 'custom_value4', value: "item.custom_value4" },
{ trans: 'item_tax1', value: "item.tax_name1" },
{ trans: 'item_tax_rate1', value: "item.tax_rate1" },
{ trans: 'item_tax2', value: "item.tax_name2" },
{ trans: 'item_tax_rate2', value: "item.tax_rate2" },
{ trans: 'item_tax3', value: "item.tax_name3" },
{ trans: 'item_tax_rate3', value: "item.tax_rate3" },
{ trans: 'type', value: "item.type_id" },
{ trans: 'tax_category', value: "item.tax_id" },
{ trans: 'assigned_user', value: "quote.assigned_user_id" },
{ trans: 'user', value: "quote.user_id" },
];