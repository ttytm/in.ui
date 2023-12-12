/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { scheduleParametersAtom } from '$app/pages/settings/schedules/common/components/EmailStatement';
import { DEFAULT_SCHEDULE_PARAMETERS } from '$app/pages/settings/schedules/common/hooks/useHandleChange';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { Report } from '../useReports';

export const DATE_RANGES_ALIASES = {
  last7: 'last7_days',
  last30: 'last30_days',
};
export function useScheduleReport() {
  const navigate = useNavigate();

  const setScheduleParameters = useSetAtom(scheduleParametersAtom);

  return (report: Report) => {
    setScheduleParameters({
      ...DEFAULT_SCHEDULE_PARAMETERS,
      report_name: report.identifier,
      start_date: report.payload.start_date,
      end_date: report.payload.end_date,
      client_id: report.payload.client_id || '',
      date_range:
        DATE_RANGES_ALIASES[
          report.payload.date_range as keyof typeof DATE_RANGES_ALIASES
        ] || report.payload.date_range,
      send_email: true,
      is_income_billed: report.payload.is_income_billed ?? false,
      is_expense_billed: report.payload.is_expense_billed ?? false,
      include_tax: report.payload.include_tax ?? false,
      status: report.payload.status || '',
      product_key: report.payload.product_key || '',
    });

    navigate('/settings/schedules/create?template=email_report');
  };
}
