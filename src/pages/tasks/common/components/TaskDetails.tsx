/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Card, Element } from '$app/components/cards';
import { InputField, Link } from '$app/components/forms';
import { useCurrentCompany } from '$app/common/hooks/useCurrentCompany';
import { Task } from '$app/common/interfaces/task';
import { TaskStatus } from '$app/common/interfaces/task-status';
import { ValidationBag } from '$app/common/interfaces/validation-bag';
import { ClientSelector } from '$app/components/clients/ClientSelector';
import { CustomField } from '$app/components/CustomField';
import { ProjectSelector } from '$app/components/projects/ProjectSelector';
import { TabGroup } from '$app/components/TabGroup';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { UserSelector } from '$app/components/users/UserSelector';
import { TaskStatusSelector } from '$app/components/task-statuses/TaskStatusSelector';
import { TaskStatus as TaskStatusBadge } from './TaskStatus';
import { PauseCircle, PlayCircle } from 'react-feather';
import { useAccentColor } from '$app/common/hooks/useAccentColor';
import { useStart } from '../hooks/useStart';
import { useStop } from '../hooks/useStop';
import { isTaskRunning } from '../helpers/calculate-entity-state';
import { TaskClock } from '../../kanban/components/TaskClock';
import { calculateTime } from '../helpers/calculate-time';
import {
  useAdmin,
  useHasPermission,
} from '$app/common/hooks/permissions/useHasPermission';
import { useEntityAssigned } from '$app/common/hooks/useEntityAssigned';
import { Upload } from '$app/pages/settings/company/documents/components';
import { endpoint } from '$app/common/helpers';
import { DocumentsTable } from '$app/components/DocumentsTable';
import { $refetch } from '$app/common/hooks/useRefetch';

interface Props {
  task: Task;
  handleChange: (property: keyof Task, value: unknown) => unknown;
  errors: ValidationBag | undefined;
  taskModal?: boolean;
  page?: 'create' | 'edit';
}

export function TaskDetails(props: Props) {
  const [t] = useTranslation();

  const { isAdmin, isOwner } = useAdmin();

  const hasPermission = useHasPermission();
  const entityAssigned = useEntityAssigned();

  const { task, handleChange, errors, page } = props;

  const company = useCurrentCompany();
  const location = useLocation();
  const accent = useAccentColor();
  const start = useStart();
  const stop = useStop();

  const calculation = calculateTime(task.time_log, {
    inSeconds: true,
    calculateLastTimeLog: false,
  });

  const onDocumentActionSuccess = () => {
    $refetch(['tasks']);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-12 xl:col-span-4 h-max">
        {task && page === 'edit' && (
          <Element leftSide={t('status')}>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center">
                <TaskStatusBadge entity={task} />
              </div>
              {isTaskRunning(task) && (
                <div className="flex items-center">
                  <TaskClock task={task} />
                </div>
              )}

              {!isTaskRunning(task) && (
                <div className="flex items-center">
                  {!isTaskRunning(task) && calculation && (
                    <p>
                      {new Date(Number(calculation) * 1000)
                        .toISOString()
                        .slice(11, 19)}
                    </p>
                  )}
                </div>
              )}

              <div>
                {!isTaskRunning(task) && !task.invoice_id && (
                  <PlayCircle
                    className="mr-0 ml-auto"
                    color="#808080"
                    size={60}
                    stroke={accent}
                    strokeWidth="1"
                    onClick={() =>
                      (hasPermission('edit_task') || entityAssigned(task)) &&
                      start(task)
                    }
                    cursor={
                      hasPermission('edit_task') || entityAssigned(task)
                        ? 'pointer'
                        : 'not-allowed'
                    }
                  />
                )}

                {isTaskRunning(task) && !task.invoice_id && (
                  <PauseCircle
                    className="mr-0 ml-auto cursor-pointer"
                    color="#808080"
                    size={60}
                    stroke={accent}
                    strokeWidth="1"
                    onClick={() =>
                      (hasPermission('edit_task') || entityAssigned(task)) &&
                      stop(task)
                    }
                    cursor={
                      hasPermission('edit_task') || entityAssigned(task)
                        ? 'pointer'
                        : 'not-allowed'
                    }
                  />
                )}
              </div>
            </div>
          </Element>
        )}

        {!task.project_id && (
          <Element leftSide={t('client')}>
            <ClientSelector
              onChange={(client) => {
                handleChange('client_id', client.id);

                if (!task.id) {
                  handleChange(
                    'rate',
                    client?.settings?.default_task_rate ?? 0
                  );
                }
              }}
              value={task.client_id}
              clearButton={Boolean(task.client_id)}
              onClearButtonClick={() => handleChange('client_id', '')}
              errorMessage={errors?.errors.client_id}
            />
          </Element>
        )}
        <Element leftSide={t('project')}>
          <ProjectSelector
            onChange={(project) => {
              handleChange('project_id', project.id);
              handleChange('client_id', '');
              handleChange('rate', project.task_rate);
            }}
            value={task.project_id}
            clearButton={Boolean(task.project_id)}
            onClearButtonClick={() => handleChange('project_id', '')}
            errorMessage={errors?.errors.project_id}
          />
        </Element>

        <Element leftSide={t('user')}>
          <UserSelector
            value={task?.assigned_user_id}
            onChange={(user) => handleChange('assigned_user_id', user.id)}
            onClearButtonClick={() => handleChange('assigned_user_id', '')}
            errorMessage={errors?.errors.assigned_user_id}
            readonly={!hasPermission('edit_task')}
          />
        </Element>

        {task && company?.custom_fields?.task1 && (
          <CustomField
            field="task1"
            defaultValue={task.custom_value1 || ''}
            value={company.custom_fields.task1}
            onValueChange={(value) => handleChange('custom_value1', value)}
          />
        )}

        {task && company?.custom_fields?.task2 && (
          <CustomField
            field="task2"
            defaultValue={task.custom_value2 || ''}
            value={company.custom_fields.task2}
            onValueChange={(value) => handleChange('custom_value2', value)}
          />
        )}
      </Card>

      <Card className="col-span-12 xl:col-span-4 h-max">
        <Element leftSide={t('task_number')}>
          <InputField
            value={task.number}
            onValueChange={(value) => handleChange('number', value)}
            errorMessage={errors?.errors.number}
          />
        </Element>

        <Element leftSide={t('rate')}>
          <InputField
            type="number"
            value={task.rate}
            onValueChange={(value) => handleChange('rate', parseFloat(value))}
            errorMessage={errors?.errors.rate}
          />
        </Element>

        <Element leftSide={t('status')}>
          <TaskStatusSelector
            value={task.status_id}
            onChange={(taskStatus: TaskStatus) =>
              taskStatus && handleChange('status_id', taskStatus.id)
            }
            onClearButtonClick={() => handleChange('status_id', '')}
            readonly={props.taskModal}
            errorMessage={errors?.errors.status_id}
          />
        </Element>

        {task && company?.custom_fields?.task3 && (
          <CustomField
            field="task3"
            defaultValue={task.custom_value3 || ''}
            value={company.custom_fields.task3}
            onValueChange={(value) => handleChange('custom_value3', value)}
          />
        )}

        {task && company?.custom_fields?.task4 && (
          <CustomField
            field="task4"
            defaultValue={task.custom_value4 || ''}
            value={company.custom_fields.task4}
            onValueChange={(value) => handleChange('custom_value4', value)}
          />
        )}
      </Card>

      {location.pathname.endsWith('/edit') && (
        <>
          <Card className="col-span-12 xl:col-span-4 h-max px-6">
            <TabGroup
              tabs={[
                t('description'),
                ...(isAdmin || isOwner ? [t('custom_fields')] : []),
              ]}
            >
              <div>
                <InputField
                  element="textarea"
                  value={task.description}
                  onValueChange={(value) => handleChange('description', value)}
                  errorMessage={errors?.errors.description}
                />
              </div>

              <div>
                <span className="text-sm">{t('custom_fields')} &nbsp;</span>
                <Link to="/settings/custom_fields/tasks" className="capitalize">
                  {t('click_here')}
                </Link>
              </div>
            </TabGroup>
          </Card>

          {task && (
            <Card className="col-span-12 px-6">
              <Upload
                widgetOnly
                endpoint={endpoint('/api/v1/tasks/:id/upload', { id: task.id })}
                onSuccess={onDocumentActionSuccess}
              />

              <DocumentsTable
                documents={task?.documents || []}
                onDocumentDelete={onDocumentActionSuccess}
                disableEditableOptions={!entityAssigned(task, true)}
              />
            </Card>
          )}
        </>
      )}

      {!location.pathname.endsWith('/edit') && (
        <Card className="col-span-12 xl:col-span-4 h-max" withContainer>
          <InputField
            label={t('description')}
            element="textarea"
            value={task.description}
            onValueChange={(value) => handleChange('description', value)}
            errorMessage={errors?.errors.description}
          />
        </Card>
      )}
    </div>
  );
}
