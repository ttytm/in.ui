/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @copyright Copyright (c) 2021. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @copyright Copyright (c) 2021. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Button } from '@invoiceninja/forms';
import { setCurrentInvoiceProperty } from 'common/stores/slices/invoices';
import { DebouncedSearch } from 'components/forms/DebouncedSearch';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

export function Actions() {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 justify-center my-6 lg:space-x-2">
      <div className="w-full lg:w-80">
        <DebouncedSearch
          endpoint="/api/v1/designs"
          label="name"
          placeholder={t('search_designs')}
          onChange={(payload) =>
            dispatch(
              setCurrentInvoiceProperty({
                property: 'design_id',
                value: payload.value,
              })
            )
          }
        />
      </div>

      <button className="text-white bg-gray-700 py-2 px-4 rounded text-sm">
        {t('save_draft')}
      </button>

      <button className="text-white bg-green-600 py-2 px-4 rounded text-sm">
        {t('mark_sent')}
      </button>

      <Button>{t('email_invoice')}</Button>
    </div>
  );
}
