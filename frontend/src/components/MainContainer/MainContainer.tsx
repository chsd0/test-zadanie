import { useState, useEffect, useMemo } from 'react';
import { Column, Box, Status, Information, Group, Node, Interface, Metrics } from '@components';
import { InformationProps } from '@components/Informtion';
import styles from './mainContainer.module.scss';
import { useGetGroupsQuery, useGetMetricsQuery, GroupInt, NodeInt, MetricsInt } from '@api';
import { getStatus, statusToColor } from '@utils';

const MainContainer = () => {
  const { data: groupsData = [], isLoading: isGroupsLoading } = useGetGroupsQuery(undefined, { pollingInterval: 60000 });
  const { data: metricsData = [], isLoading: isMetricsLoading } = useGetMetricsQuery(undefined, { pollingInterval: 60000 });

  const mergedData = useMemo(() => {
    if (!groupsData.length || !metricsData.length) return groupsData;

    const metricMap = metricsData.reduce((acc, metric) => {
      if (metric?.node?.id) {
        acc[metric.node.id] = metric.utilization || { cpu: 0, memory: 0, disc: 0 };
      }
      return acc;
    }, {} as Record<number, { cpu: number; memory: number; disc: number }>);

    return groupsData.map(group => ({
      ...group,
      nodes: group.nodes?.map(node => ({
        ...node,
        utilization: node?.id ? metricMap[node.id] : { cpu: 0, memory: 0, disc: 0 }
      })) || []
    }));
  }, [groupsData, metricsData]);

  const [currentGroup, setCurrentGroup] = useState<GroupInt | null>(null);
  const [currentNode, setCurrentNode] = useState<NodeInt | null>(null);
  const [currentMetrics, setCurrentMetrics] = useState<MetricsInt | null>(null);

  useEffect(() => {
    if (mergedData.length > 0 && !currentGroup) {
      setCurrentGroup(mergedData[0]);
    }
  }, [mergedData, currentGroup]);

  useEffect(() => {
    if (currentGroup?.nodes?.length) {
      setCurrentNode(currentGroup.nodes[0]);
    }
  }, [currentGroup]);

  useEffect(() => {
    if (metricsData.length > 0) {
      setCurrentMetrics(prevMetrics => {
        if (prevMetrics) {
          return [...prevMetrics, ...metricsData];
        }
        return metricsData;
      });
    }
  }, [metricsData]);

  if (isGroupsLoading || isMetricsLoading) {
    return <div className={styles.loading}>Загрузка данных...</div>;
  }

  const status = getStatus(currentGroup);

  const informationProps: InformationProps = {
    currentGroup: currentGroup?.id,
    nodesInGroup: currentGroup?.nodes?.length || 0,
    status: status,
    lastUpdate: new Date().toLocaleTimeString()
  };

  return (
    <main className={styles.mainСontainer}>
      <Column>
        <Box title='Статус сервиса'>
          <Status caption={status!} color={statusToColor[status!]} />
        </Box>
        <Box title='Общая информация'>
          <Information {...informationProps} />
        </Box>
        <Box title='Группы'>
          <section className={styles.groupWrapper}>
            {mergedData.map((group) => (
              <Group
                key={group.id}
                groupNumber={group.id}
                nodeCount={group.nodes?.length || 0}
                active={group.id === currentGroup?.id}
                onClick={() => setCurrentGroup(group)}
              />
            ))}
          </section>
        </Box>
      </Column>

      <div className={styles.divider} />

      <Column scrollable={true}>
        {currentGroup?.nodes?.map(node => (
          <Node
            key={node.id}
            caption={node.caption || 'Без названия'}
            color={node.status?.color || 'grey'}
            cpu={node.utilization?.cpu!}
            memory={node.utilization?.memory!}
            disk={node.utilization?.disc!}
            active={node.id === currentNode?.id}
            onClick={() => setCurrentNode(node)}
          />
        ))}
      </Column>

      <div className={styles.divider} />

      <Column>
        <Box title='Метрики'>
          <Metrics nodeId={currentNode?.id} metrics={currentMetrics} />
        </Box>

        <Box title='Интерфейс'>
          {currentNode?.interface ? (
            <Interface
              caption={currentNode.interface.caption}
              statusCaption={currentNode.interface.status?.description || 'N/A'}
              statusColor={currentNode.interface.status?.color || 'grey'}
            />
          ) : 'Нет данных'}
        </Box>

        <Box title='Администратор'>
          {currentNode?.admin ? (
            <span className={styles.admin}>
              {`${currentNode.admin.firstname} ${currentNode.admin.lastname} | ${currentNode.admin.email}`}
            </span>
          ) : 'Не назначен'}
        </Box>

        <Box title='Приложения'>
          <div className={styles.application}>
            {currentNode?.application || 'Не указано'}
          </div>
        </Box>
      </Column>
    </main>
  );
};

export default MainContainer;
