/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { endpoint } from '$app/common/helpers';
import { request } from '$app/common/helpers/request';
import { GenericSingleResourceResponse } from '$app/common/interfaces/generic-api-response';
import { RecurringInvoice } from '$app/common/interfaces/recurring-invoice';
import { GenericQueryOptions } from '$app/common/queries/invoices';
import { useQuery, useQueryClient } from 'react-query';
import { route } from '$app/common/helpers/route';
import { toast } from '$app/common/helpers/toast/toast';
import { useAtomValue } from 'jotai';
import { invalidationQueryAtom } from '$app/common/atoms/data-table';

interface RecurringInvoiceQueryParams {
  id: string;
}

export function useRecurringInvoiceQuery(params: RecurringInvoiceQueryParams) {
  return useQuery<RecurringInvoice>(
    route('/api/v1/recurring_invoices/:id', { id: params.id }),
    () =>
      request(
        'GET',
        endpoint('/api/v1/recurring_invoices/:id?include=client', {
          id: params.id,
        })
      ).then(
        (response: GenericSingleResourceResponse<RecurringInvoice>) =>
          response.data.data
      ),
    { staleTime: Infinity }
  );
}

export function useBlankRecurringInvoiceQuery(options?: GenericQueryOptions) {
  return useQuery<RecurringInvoice>(
    '/api/v1/recurring_invoice/create',
    () =>
      request('GET', endpoint('/api/v1/recurring_invoices/create')).then(
        (response: GenericSingleResourceResponse<RecurringInvoice>) =>
          response.data.data
      ),
    { ...options, staleTime: Infinity }
  );
}

type Action =
  | 'archive'
  | 'restore'
  | 'delete'
  | 'start'
  | 'stop'
  | 'update_prices';

const successMessages = {
  start: 'started_recurring_invoice',
  stop: 'stopped_recurring_invoice',
  update_prices: 'updated_prices',
};

interface Params {
  onSuccess?: () => void;
}

export function useBulkAction(params?: Params) {
  const queryClient = useQueryClient();
  const invalidateQueryValue = useAtomValue(invalidationQueryAtom);

  const { onSuccess } = params || {};

  return (ids: string[], action: Action, onActionCall?: () => void) => {
    toast.processing();

    request('POST', endpoint('/api/v1/recurring_invoices/bulk'), {
      action,
      ids,
    })
      .then(() => {
        const message =
          successMessages[action as keyof typeof successMessages] ||
          `${action}d_invoice`;

        toast.success(message);

        onSuccess?.();

        invalidateQueryValue &&
          queryClient.invalidateQueries([invalidateQueryValue]);

        ids.forEach((id) =>
          queryClient.invalidateQueries(
            route('/api/v1/recurring_invoices/:id', { id })
          )
        );
      })
      .finally(() => onActionCall?.());
  };
}
